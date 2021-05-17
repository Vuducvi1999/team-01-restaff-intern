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
using System.Linq;
using System.Text;

namespace Service.Coupons
{
    public class CouponService : ICouponService
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
                TrimData(entity);
                if (DateTime.Compare(entity.StartDate, entity.EndDate) < 0)
                {
                    entity.Insert();
                    _couponRepository.Insert(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CouponDTO>(false, _mapper.Map<Coupon, CouponDTO>(entity), MessageConstants.CreateSuccess);
                    return result;
                }
                return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);
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
                TrimData(entity);
                if (entity.IsNotNullOrEmpty() || DateTime.Compare(entity.StartDate, entity.EndDate) < 0)
                {
                    entity.Update(model);
                    _couponRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CouponDTO>(false, _mapper.Map<Coupon, CouponDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;

                }
                return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CouponDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CouponDTO>> SearchPagination(SearchPaginationDTO<CouponDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CouponDTO>>(false, null, MessageConstants.GetPaginationFail);
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
            var result = new ReturnMessage<PaginatedList<CouponDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }

        private void TrimData(Coupon coupon)
        {
            coupon.Code = coupon.Code.Trim();
            coupon.Name = coupon.Name.Trim();
        }

        public ReturnMessage<CouponDTO> GetByCode(string code)
        {
            var entity = _couponRepository.Queryable().FirstOrDefault(t => t.Code == code);
            if (entity.IsNotNullOrEmpty())
            {
                if(entity.EndDate < DateTime.Now)
                {
                    return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);

                }
                var result = _mapper.Map<CouponDTO>(entity);
                return new ReturnMessage<CouponDTO>(false, result, MessageConstants.GetSuccess);
            }

            return new ReturnMessage<CouponDTO>(true, null, MessageConstants.Error);

        }
    }
}
