using BE.Controllers;
using Common.Constants;
using Domain.DTOs.ProductsFeUser;
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
    }

}
