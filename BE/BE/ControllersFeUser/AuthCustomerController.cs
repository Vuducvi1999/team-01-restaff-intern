using BE.Controllers;
using Common.Constants;
using Domain.DTOs.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.AuthCustomer;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseAuthCustomer)]
    [ApiController]
    public class AuthCustomerController : BaseController
    {
        private readonly IAuthCustomerUserService _authCustomerService;
        public AuthCustomerController(IAuthService authService, IUserManager userManager, IFileService fileService, IAuthCustomerUserService authCustomerService) : base(authService, userManager, fileService)
        {
            _authCustomerService = authCustomerService;
        }

        [HttpPost(UrlConstants.BaseLoginCustomer)]
        public IActionResult Login([FromBody] CustomerLoginDTO data)
        {
            var result = _authCustomerService.CheckLogin(data);
            return CommonResponse(result);
        }

        [HttpPost(UrlConstants.BaseRegistCustomer)]
        public IActionResult Register([FromBody] CustomerRegisterDTO data)
        {
            var result = _authCustomerService.CheckRegister(data);
            return CommonResponse(result);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetInfo()
        {
            var result = _authCustomerService.GetCustomerDataReturnDTO();
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckEmail)]
        public IActionResult CheckEmail([FromQuery] CustomerEmailDTO dto)
        {
            var result = _authCustomerService.CheckEmail(dto);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckPhone)]
        public IActionResult CheckPhone([FromQuery] CustomerPhoneDTO dto)
        {
            var result = _authCustomerService.CheckPhone(dto);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckUserName)]
        public IActionResult CheckUserName([FromQuery] CustomerUserNameDTO dto)
        {
            var result = _authCustomerService.CheckUserName(dto);
            return CommonResponse(result);
        }
    }
}
