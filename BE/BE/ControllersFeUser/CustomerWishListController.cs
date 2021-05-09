using BE.Controllers;
using Common.Constants;
using Common.Pagination;
using Domain.DTOs.CustomerWishList;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Contacts;
using Service.CustomerWishLists;
using Service.Files;
using System;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseCustomerWishList)]
    [ApiController]
    public class CustomerWishListController : BaseController
    {
        private readonly ICustomerWishListService _service;

        public CustomerWishListController(ICustomerWishListService service, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _service.GetAll();
            return CommonResponse(result);
        }

        [Route(UrlConstants.GetCustomerWishList)]
        [HttpGet]
        public IActionResult GetByCustomer(Guid customerId)
        {
            var result = _service.GetByCustomer(customerId);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateCustomerWishListDTO model)
        {

            var result = _service.Create(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteCustomerWishListDTO model)
        {
            var result = _service.Delete(model);
            return CommonResponse(result);
        }
    }
}
