using Common.Http;
using Domain.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;

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

        public UserDataReturnDTO InformationUser
        {
            get{
                var userId = _authService.GetInformationToken(this.User.Claims).Id;
                return _userManager.GetInformationAuth(userId);
            }
        }
    }
}
