using BE.Controllers;
using Common.Constants;
using Domain.DTOs.CustomerProfileFeUser;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.CustomerProfileFeUser;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseProfileCustomer)]
    [ApiController]
    public class ProfileCustomerController : BaseController
    {
        private readonly ICustomerProfileFeUserService _customerProfileFeUserService;
        public ProfileCustomerController(IAuthService authService, IUserManager userManager, IFileService fileService, ICustomerProfileFeUserService customerProfileFeUserService) : base(authService, userManager, fileService)
        {
            _customerProfileFeUserService = customerProfileFeUserService;
        }

        [Authorize]
        [HttpPut]
        public IActionResult UpdateProfile([FromBody] UpdateCustomerProfileFeUserDTO model)
        {
            var result = _customerProfileFeUserService.Update(HttpContext.User.Claims, model);
            var uploadImage = _fileService.UpdateIdFile(model.Files, result.Data!.Id);
            return CommonResponse(result);
        }

        [Authorize]
        [HttpPut(UrlConstants.Password)]
        public IActionResult ChangePassword([FromBody] ChangePasswordCustomerProfileFeUserDTO dto)
        {

            var result = _customerProfileFeUserService.ChangePassword(HttpContext.User.Claims, dto);
            return CommonResponse(result);
        }
    }
}
