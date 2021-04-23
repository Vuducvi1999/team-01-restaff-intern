using BE.Controllers;
using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseProductFeUser)]
    [ApiController]
    public class ProductFeUserController : BaseController
    {
        private readonly IProductService _productService;

        public ProductFeUserController(IProductService productService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _productService = productService;
        }
        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<ProductDTO> serachPagination)
        {

            var result = _productService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpGet]
        [Route("category")]
        public IActionResult GetByCategory([FromQuery] Guid id)
        {

            var result = _productService.GetByCategory(id);
            return CommonResponse(result);
        }


    }
}
