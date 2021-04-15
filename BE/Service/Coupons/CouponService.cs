using AutoMapper;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Coupons;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Service.Coupons;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Coupons
{
    public class CouponService: ICouponService
    {
        private readonly IRepository<Coupon> _socialMediaRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CouponService(IRepository<Coupon> socialMediaRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _socialMediaRepository = socialMediaRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CouponDTO> Create(CreateCouponDTO model)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<CouponDTO> Delete(DeleteCouponDTO model)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<PaginatedList<CouponDTO>> SearchPagination(SerachPaginationDTO<CouponDTO> serach)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<CouponDTO> Update(UpdateCouponDTO model)
        {
            throw new NotImplementedException();
        }
    }
}
