using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Common.StringEx;
using Domain.DTOs.Orders;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.Orders
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderService( IRepository<Order> orderRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<OrderDTO> Create(CreateOrderDTO model)
        {

            try
            {

                var entity = _mapper.Map<CreateOrderDTO, Order>(model);

                entity.Insert();
                _orderRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<OrderDTO>(false, _mapper.Map<Order, OrderDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<OrderDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<OrderDTO> Delete(DeleteOrderDTO model)
        {
            try
            {
                var entity = _orderRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.IsDeleted = true;
                    _orderRepository.Update(entity);
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
                , search.PageIndex
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
