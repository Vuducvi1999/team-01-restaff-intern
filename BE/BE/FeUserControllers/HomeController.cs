using BE.Controllers;
using Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Home;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BE.FeUserControllers
{
    [Route(UrlConstants.BaseHome)]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IHomeService _homeService;

        public HomeController(IHomeService productService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _homeService = productService;
        }

        [HttpGet("top-collection")]
        public IActionResult GetTopCollectionProducts()
        {

            var result = _homeService.GetTopCollectionProducts();
            return CommonResponse(result);
        }
        [HttpGet("new-products")]
        public IActionResult GetNewProducts()
        {

            var result = _homeService.GetNewProducts();
            return CommonResponse(result);
        }
        [HttpGet("best-seller")]
        public IActionResult GetBestSellerProducts()
        {

            var result = _homeService.GetBestSellerProducts();
            return CommonResponse(result);
        }
        [HttpGet("featured-products")]
        public IActionResult GetFeaturedProducts()
        {

            var result = _homeService.GetFeaturedProducts();
            return CommonResponse(result);
        }
        [HttpGet("on-sale")]
        public IActionResult GetOnSaleProducts()
        {

            var result = _homeService.GetOnSaleProducts();
            return CommonResponse(result);
        }
    }
}
