using Common.Constants;
using Common.Http;
using Domain.DTOs.Profiles;
using Domain.DTOs.User;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Profiles;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseProfile)]
    [ApiController]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService, IAuthService authService, IUserManager userManager) : base(authService, userManager)
        {
            _profileService = profileService;
        }


        [HttpPut]
        public IActionResult Update([FromBody] UpdateProfileDTO model)
        {
            var result = _profileService.Update(model);
            return CommonResponse(result);
        }

        [HttpPut]
        [Route("password")]
        public IActionResult ChangePassword([FromBody] ChangePassworProfileDTO model)
        {
            var result = _profileService.ChangePassword(model);
            return CommonResponse(result);
        }

    }
}
