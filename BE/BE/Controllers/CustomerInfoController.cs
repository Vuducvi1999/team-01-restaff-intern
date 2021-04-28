using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Customer;
using Domain.DTOs.CustomerInfo;
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
    [Route(UrlConstants.BaseCustomerInfo)]
    [ApiController]
    public class CustomerInfoController : BaseController
    {
        private readonly ICustomerInfoService _customerService;

        public CustomerInfoController(IAuthService authService, IUserManager userManager, IFileService fileService, ICustomerInfoService customerService) : base(authService, userManager, fileService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<CustomerInfoDTO> serachPagination)
        {
            var result = _customerService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCustomerInfoDTO model)
        {
            var result = _customerService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateCustomerInfoDTO model)
        {
            var result = _customerService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteCustomerInfoDTO model)
        {
            var result = _customerService.Delete(model);
            return CommonResponse(result);
        }
    }
}
