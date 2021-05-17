using BE.Controllers;
using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Blogs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.UserBlogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [ApiController]
    public class UserBlogController : BaseController
    {
        private readonly IUserBlogService _userBlogService;

        public UserBlogController(IUserBlogService userBlogService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _userBlogService = userBlogService;
        }

        [HttpGet(UrlConstants.GetUserBlog)]
        public IActionResult Get([FromQuery] SerachPaginationDTO<BlogDTO> serachPagination)
        {
            var result = _userBlogService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [Route(UrlConstants.TopBlog)]
        [HttpGet]
        public IActionResult TopBlog([FromQuery] List<BlogDTO> model)
        {
            var result = _userBlogService.TopBlog(model);
            return CommonResponse(result);
        }

        [Route(UrlConstants.RecentBlog)]
        [HttpGet]
        public IActionResult RecentBlog([FromQuery] List<BlogDTO> model)
        {
            var result = _userBlogService.RecentBlog(model);
            return CommonResponse(result);
        }

        [Route(UrlConstants.GetBlog)]
        [HttpGet]
        public IActionResult GetBlog(Guid id)
        {
            var result = _userBlogService.GetBlog(id);
            return CommonResponse(result);
        }
    }
}
