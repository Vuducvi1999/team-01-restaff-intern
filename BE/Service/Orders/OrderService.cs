using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Common.StringEx;
using Domain.DTOs.Orders;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Service.Coupons;
using Service.Products;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.Orders
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<Coupon> _couponRepository;
        private readonly ICouponService _couponService;
        private readonly IProductService _productService;


        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderService(IProductService productService, ICouponService couponService, IRepository<Order> orderRepository, IUnitOfWork unitOfWork, IMapper mapper, IRepository<Coupon> couponRepository)
        {

            _orderRepository = orderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _couponRepository = couponRepository;
            _couponService = couponService;
            _productService = productService;
        }

        public ReturnMessage<OrderDTO> Create(CreateOrderDTO model)
        {

            try
            {
                var coupon = _couponRepository.Queryable().FirstOrDefault(t => t.Id == model.CouponId);
                if ((coupon.IsNotNullOrEmpty() && _couponService.GetByCode(coupon.Code).HasError == false) || model.CouponCode == null)
                {
                    var invalidProducts = false;
                    model.OrderDetails.ForEach(detail =>
                    {
                        var res = _productService.GetById(detail.ProductId);
                        if (res.HasError)
                        {
                            invalidProducts = true;
                        }
                    });

                    if (invalidProducts)
                    {
                        return new ReturnMessage<OrderDTO>(true, null, MessageConstants.Error);

                    }

                    var entity = _mapper.Map<CreateOrderDTO, Order>(model);
                    _unitOfWork.BeginTransaction();
                    entity.Insert(coupon);

                    _orderRepository.Insert(entity);

                    _unitOfWork.SaveChanges();
                    _unitOfWork.Commit();

                    var result = GetById(entity.Id);
                    return result;

                }
                return new ReturnMessage<OrderDTO>(true, null, MessageConstants.Error);

            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<OrderDTO>(true, null, ex.Message);
            }
        }


        public ReturnMessage<OrderDTO> GetById(Guid id)
        {
            var order = _orderRepository.Queryable()
                .AsNoTracking()
                .Include(t => t.OrderDetails)
                .ThenInclude(t => t.Product)
                .FirstOrDefault(t => t.Id == id);
            var result = new ReturnMessage<OrderDTO>(false, _mapper.Map<Order, OrderDTO>(order), MessageConstants.GetPaginationSuccess);
            return result;

        }
        public ReturnMessage<OrderDTO> Delete(DeleteOrderDTO model)
        {
            try
            {
                var entity = _orderRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _orderRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<OrderDTO>(false, _mapper.Map<Order, OrderDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<OrderDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<OrderDTO>(true, null, ex.Message);
            }
        }


        public ReturnMessage<PaginatedList<OrderDTO>> SearchPagination(SerachPaginationDTO<OrderDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<OrderDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _orderRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.FullName.Contains(search.Search.FullName) ||
                        it.Code.Contains(search.Search.Code)
                    )
                )
                , search.PageSize
                , search.PageIndex * search.PageSize
                , t => t.FullName
            );
            var data = _mapper.Map<PaginatedList<Order>, PaginatedList<OrderDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<OrderDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }

        public ReturnMessage<OrderDTO> Update(UpdateOrderDTO model)
        {
            try
            {
                var entity = _orderRepository.Find(model.Id);
                if (entity.Status != "New")
                {
                    return new ReturnMessage<OrderDTO>(true, null, MessageConstants.UpdateFail);
                }
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _orderRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<OrderDTO>(false, _mapper.Map<Order, OrderDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;
                }
                return new ReturnMessage<OrderDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<OrderDTO>(true, null, ex.Message);
            }
        }
    }
}
