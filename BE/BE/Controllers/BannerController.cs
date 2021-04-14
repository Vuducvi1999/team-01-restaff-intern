using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Banners;
using Domain.DTOs.Suppliers;
using Microsoft.AspNetCore.Mvc;
using Service.Banners;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseBanner)]
    [ApiController]
    public class BannerController : BaseController
    {
        private readonly IBannerService _bannerService;


        public BannerController(IBannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<BannerDTO> serachPagination)
        {

            var result = _bannerService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateBannerDTO model)
        {
            var result = _bannerService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateBannerDTO model)
        {
            var result = _bannerService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteBannerDTO model)
        {
            var result = _bannerService.Delete(model);
            return CommonResponse(result);
        }
    }
}
