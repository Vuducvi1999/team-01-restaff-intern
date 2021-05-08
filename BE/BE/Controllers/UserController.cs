using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Users;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Users;
using System;

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

        [Route(UrlConstants.GetUser)]
        [HttpGet]
        public IActionResult GetDetailUser(Guid id)
        {
            var result = _userService.GetDetailUser(id);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserDTO model)
        {
            var result = _userService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateUserDTO model)
        {
            var result = _userService.Update(model);
            var uploadImage = _fileService.UpdateIdFile(model.Files, result.Data.Id);
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
