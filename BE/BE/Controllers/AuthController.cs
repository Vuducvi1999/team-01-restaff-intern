﻿using Common.Constants;
using Common.Http;
using Common.MD5;
using Domain.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using System;
using System.Diagnostics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BE.Controllers
{
    [Route(UrlConstants.BaseAuth)]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserLoginDTO data)
        {
            var result = _authService.CheckLogin(data);
            //var result = MD5Helper.ToMD5Hash(data.Password);
            return CommonResponse(result);
        }
    }
}