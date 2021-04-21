using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Users;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Users;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseUser)]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<UserDTO> serachPagination)
        {
            var result = _userService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserDTO model)
        {
            var result = _userService.Create(model);
            if (model.Files.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            var uploadImage = _fileService.UpdateImageCategory(model.Files, result.Data.Id);
            if (uploadImage.HasError)
            {
                return CommonResponse(uploadImage);
            }
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateUserDTO model)
        {
            var result = _userService.Update(model);
            if (model.Files.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            var uploadImage = _fileService.UpdateImageCategory(model.Files, result.Data.Id);
            if (uploadImage.HasError)
            {
                return CommonResponse(uploadImage);
            }
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteUserDTO model)
        {
            var result = _userService.Delete(model);
            return CommonResponse(result);
        }
    }
}
