using Common.Constants;
using Domain.DTOs.PageContent;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.PageContents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers.FEUsers
{
    [Route(UrlConstants.BaseUserPageContent)]
    [ApiController]
    public class UserPageContentController : BaseController
    {
        private readonly IPageContentService _pageContentService;

        public UserPageContentController(IPageContentService pageContentService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _pageContentService = pageContentService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _pageContentService.GetList();
            return CommonResponse(result);
        }

        [Route(UrlConstants.GetPageContentUser)]
        [HttpGet]
        public IActionResult GetById(Guid id)
        {
            var result = _pageContentService.GetById(id);
            return CommonResponse(result);
        }
    }
}
