using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Customer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Customers;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseCustomer)]
    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customerService;

        public CustomerController(IAuthService authService, IUserManager userManager, IFileService fileService, ICustomerService customerService) : base(authService, userManager, fileService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<CustomerDTO> serachPagination)
        {
            var result = _customerService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCustomerDTO model)
        {
            var result = _customerService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateCustomerDTO model)
        {
            var result = _customerService.Update(model);
            return CommonResponse(result);
        }

        //[HttpDelete]
        //public IActionResult Delete([FromQuery] DeleteCustomerDTO model)
        //{
        //    var result = _customerService.Delete(model);
        //    return CommonResponse(result);
        //}
    }
}
