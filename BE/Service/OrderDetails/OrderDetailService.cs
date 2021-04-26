using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Common.StringEx;
using Domain.DTOs.OrderDetails;
using Domain.DTOs.Orders;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.OrderDetails
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IRepository<OrderDetail> _orderDetailRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderDetailService(IRepository<OrderDetail> orderDetailRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _orderDetailRepository = orderDetailRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<OrderDetailDTO> Create(CreateOrderDetailDTO model)
        {

            //    try
            //    {

            //        var entity = _mapper.Map<CreateOrderDetailDTO, OrderDetail>(model);

            //        entity.Insert();
            //        _orderDetailRepository.Insert(entity);
            //        _unitOfWork.SaveChanges();
            //        var result = new ReturnMessage<OrderDetailDTO>(false, _mapper.Map<OrderDetail, OrderDetailDTO>(entity), MessageConstants.CreateSuccess);
            //        return result;
            //    }
            //    catch (Exception ex)
            //    {
            return new ReturnMessage<OrderDetailDTO>(true, null, null);
            //    }
        }

        public ReturnMessage<OrderDetailDTO> Delete(DeleteOrderDetailDTO model)
            {
            try
            {
                var entity = _orderDetailRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _orderDetailRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<OrderDetailDTO>(false, _mapper.Map<OrderDetail, OrderDetailDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<OrderDetailDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<OrderDetailDTO>(true, null, ex.Message);
        }
    }


    public ReturnMessage<PaginatedList<OrderDetailDTO>> SearchPagination(SerachPaginationDTO<OrderDetailDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<OrderDetailDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _orderDetailRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) 
                    )
                )
                , search.PageSize
                , search.PageIndex
                
            );
            var data = _mapper.Map<PaginatedList<OrderDetail>, PaginatedList<OrderDetailDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<OrderDetailDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }

        public ReturnMessage<OrderDetailDTO> Update(UpdateOrderDetailDTO model)
        {
            try
            {
                var entity = _orderDetailRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _orderDetailRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<OrderDetailDTO>(false, _mapper.Map<OrderDetail, OrderDetailDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;
                }
                return new ReturnMessage<OrderDetailDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<OrderDetailDTO>(true, null, ex.Message);
            }
        }
    }
}
