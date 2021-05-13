using BE.Controllers;
using Common.Constants;
using Domain.DTOs.Customer;
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
            var result = _customerProfileFeUserService.UpdateProfile(model);
            if(result.HasError)
            {
                return CommonResponse(result);
            }
            var uploadImage = _fileService.UpdateIdFile(model.Files, result.Data.Id);
            if(uploadImage.HasError)
            {
                return CommonResponse(uploadImage);
            }
            return CommonResponse(result);
        }

        [Authorize]
        [HttpPut(UrlConstants.Password)]
        public IActionResult ChangePassword([FromBody] ChangePasswordCustomerProfileFeUserDTO dto)
        {

            var result = _customerProfileFeUserService.ChangePassword(dto);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckEmail)]
        public IActionResult CheckEmail([FromQuery] CustomerEmailDTO dto)
        {
            var result = _customerProfileFeUserService.CheckEmail(dto);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckPhone)]
        public IActionResult CheckPhone([FromQuery] CustomerPhoneDTO dto)
        {
            var result = _customerProfileFeUserService.CheckPhone(dto);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.CheckUserName)]
        public IActionResult CheckUserName([FromQuery] CustomerUserNameDTO dto)
        {
            var result = _customerProfileFeUserService.CheckUserName(dto);
            return CommonResponse(result);
        }
    }
}
