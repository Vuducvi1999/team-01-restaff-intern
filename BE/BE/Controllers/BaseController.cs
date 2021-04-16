using Common.Constants;
using Common.Http;
using Domain.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using System.Collections.Generic;

namespace BE.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserManager _userManager;
        public BaseController(IAuthService authService, IUserManager userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }
        public IActionResult CommonResponse<T>(ReturnMessage<T> data)
        {
            if (data.HasError)
            {
                return BadRequest(data);
            }
            return Ok(data);
        }

        public ReturnMessage<UserDataReturnDTO> InformationUser
        {
            get
            {
                var userId = _authService.GetInformationToken(this.User.Claims).Id;
                return new ReturnMessage<UserDataReturnDTO>(true, _userManager.GetInformationAuth(userId), MessageConstants.DeleteSuccess);
            }
        }

        public IDictionary<string,string> EnityType
        {
            get
            {
                var result = DataType.Type;
                return result;
            }
        }
    }
}
