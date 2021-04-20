using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Banners;
using Domain.DTOs.Suppliers;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Banners;
using Service.Files;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseBanner)]
    [ApiController]
    public class BannerController : BaseController
    {
        private readonly IBannerService _bannerService;


        public BannerController(IBannerService bannerService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
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
            if (model.Files.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            var uploadImage = _fileService.UpdateImageCategory(model.Files, result.Data.Id);
            if (uploadImage.HasError)
            {
                return CommonResponse(uploadImage);
            }
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateBannerDTO model)
        {
            var result = _bannerService.Update(model);
            if (model.Files.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            var uploadImage = _fileService.UpdateImageCategory(model.Files, result.Data.Id);
            if (uploadImage.HasError)
            {
                return CommonResponse(uploadImage);
            }
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
