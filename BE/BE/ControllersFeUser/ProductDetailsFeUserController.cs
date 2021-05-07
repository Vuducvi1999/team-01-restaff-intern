using BE.Controllers;
using Common.Constants;
using Domain.DTOs.ProductRating;
using Domain.DTOs.ProductsFeUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.ProductDetailsFeUser;
using Service.ServiceFeUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseProductDetailsFeUser)]
    [ApiController]
    public class ProductDetailsFeUserController : BaseController
    {
        private readonly IProductDetailsFeService _productDetailsFeService;

        public ProductDetailsFeUserController(IProductDetailsFeService productDetailsFeService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _productDetailsFeService = productDetailsFeService;
        }
        [HttpGet]
        public IActionResult Get([FromQuery] ProductDTOFeUser search)
        {
            var result = _productDetailsFeService.GetDetails(search);
            return CommonResponse(result);
        }
        [Authorize]
        [HttpPost(UrlConstants.BaseRating)]
        public IActionResult AddRating([FromBody] CreateProductRatingDTO model)
        {
            var claims = HttpContext.User.Claims;
            var result = _productDetailsFeService.CreateRating(claims, model);
            return CommonResponse(result);
        }
        [Authorize]
        [HttpPut(UrlConstants.BaseRating)]
        public IActionResult UpdateRating([FromBody] UpdateProductRatingDTO model)
        {
            var result = _productDetailsFeService.UpdateRating(model);
            return CommonResponse(result);
        }
        [Authorize]
        [HttpGet(UrlConstants.BaseRating)]
        public IActionResult GetRating([FromQuery]Guid productId)
        {
            var claims = HttpContext.User.Claims;
            var result = _productDetailsFeService.GetRating(claims, productId);
            return CommonResponse(result);
        }

    }

}
