using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Blogs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Blogs;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseBlog)]
    [ApiController]
    public class BlogController : BaseController
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<BlogDTO> serachPagination)
        {
            var result = _blogService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateBlogDTO model)
        {
            var result = _blogService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateBlogDTO model)
        {
            var result = _blogService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteBlogDTO model)
        {
            var result = _blogService.Delete(model);
            return CommonResponse(result);
        }
    }
}
