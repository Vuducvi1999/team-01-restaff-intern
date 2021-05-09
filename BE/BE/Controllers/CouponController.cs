using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Coupons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Coupons;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseCoupon)]
    [ApiController]
    public class CouponController : BaseController
    {
        private readonly ICouponService _couponService;

        public CouponController(ICouponService couponService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _couponService = couponService;
        }
        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<CouponDTO> serachPagination)
        {
            var result = _couponService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }
        [HttpGet]
        [Route("by-code")]
        public IActionResult GetByCode([FromQuery] string code)
        {
            var result = _couponService.GetByCode(code);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCouponDTO model)
        {
            var result = _couponService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateCouponDTO model)
        {
            var result = _couponService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteCouponDTO model)
        {
            var result = _couponService.Delete(model);
            return CommonResponse(result);
        }

    }
}
