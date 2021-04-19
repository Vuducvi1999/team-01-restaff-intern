using Common.Constants;
using Common.Http;
using Common.MD5;
using Domain.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
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
        private readonly IUserManager _authManager;

        public AuthController(IAuthService authService, IUserManager authManager, IFileService fileService) : base(authService, authManager, fileService)
        {
            _authService = authService;
            _authManager = authManager;
        }

        [HttpPost(UrlConstants.BaseLogin)]
        public IActionResult Login([FromBody] UserLoginDTO data)
        {
            var result = _authService.CheckLogin(data);
            //var result = MD5Helper.ToMD5Hash(data.Password);
            return CommonResponse(result);
        }

        public string token { get; set; }
        public UserDataReturnDTO userDataReturnDTO { get; set; }
    }
}
