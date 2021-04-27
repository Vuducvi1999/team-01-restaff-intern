using BE.Controllers;
using Common.Constants;
using Domain.DTOs.PageContent;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Home;
using Service.PageContents;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BasePageContent)]
    [ApiController]
    public class PageContentController: BaseController
    {
        private readonly IPageContentService _pageContentService;

        public PageContentController(IPageContentService pageContentService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _pageContentService = pageContentService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _pageContentService.GetList();
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Put([FromBody] UpdatePageContentDTO model)
        {
            var result = _pageContentService.Update(model);
            return CommonResponse(result);
        }
    }
}
