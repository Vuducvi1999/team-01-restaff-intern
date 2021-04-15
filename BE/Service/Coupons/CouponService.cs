using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Coupons;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Coupons;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Coupons
{
    public class CouponService: ICouponService
    {
        private readonly IRepository<Coupon> _couponRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CouponService(IRepository<Coupon> couponRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _couponRepository = couponRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CouponDTO> Create(CreateCouponDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateCouponDTO, Coupon>(model);
                entity.Insert();
                _couponRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CouponDTO>(false, _mapper.Map<Coupon, CouponDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CouponDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CouponDTO> Delete(DeleteCouponDTO model)
        {
            try
            {
                var entity = _couponRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _couponRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CouponDTO>(false, _mapper.Map<Coupon, CouponDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CouponDTO>(true, null, ex.Message);
            }
        }

        

        public ReturnMessage<CouponDTO> Update(UpdateCouponDTO model)
        {
            try
            {
                var entity = _couponRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _couponRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CouponDTO>(false, _mapper.Map<Coupon, CouponDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CouponDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CouponDTO>> SearchPagination(SerachPaginationDTO<CouponDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CouponDTO>>(false, null, MessageConstants.DeleteSuccess);
            }

            var resultEntity = _couponRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Code.Contains(search.Search.Code) ||
                        it.Name.Contains(search.Search.Name)
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.Name
            );
            var data = _mapper.Map<PaginatedList<Coupon>, PaginatedList<CouponDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CouponDTO>>(false, data, MessageConstants.DeleteSuccess);

            return result;
        }
    }
}
