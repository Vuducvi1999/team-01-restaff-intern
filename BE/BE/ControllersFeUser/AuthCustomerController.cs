using BE.Controllers;
using Common.Constants;
using Domain.DTOs.Customer;
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
        private readonly IAuthCustomerService _authCustomerService;
        public AuthCustomerController(IAuthService authService, IUserManager userManager, IFileService fileService, IAuthCustomerService authCustomerService) : base(authService, userManager, fileService)
        {
            _authCustomerService = authCustomerService;
        }

        [HttpPost(UrlConstants.BaseLoginCustomer)]
        public IActionResult Login([FromBody] CustomerLoginDTO data)
        {
            var result = _authCustomerService.CheckLogin(data);
            //var result = MD5Helper.ToMD5Hash(data.Password);
            return CommonResponse(result);
        }

        public string token { get; set; }
        public CustomerDataReturnDTO userDataReturnDTO { get; set; }
    }
}
