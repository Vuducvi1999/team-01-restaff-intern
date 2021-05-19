﻿using BE.Controllers;
using Common.Constants;
using Domain.DTOs.PageContent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Home;
using Service.PageContents;
using System;

namespace BE.ControllersFeUser.FEAdmins
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

        [Route(UrlConstants.GetPageContent)]
        [HttpGet]
        public IActionResult GetById(Guid id)
        {
            var result = _pageContentService.GetById(id);
            return CommonResponse(result);
        }

        [Authorize]
        [HttpPut]
        public IActionResult Put([FromBody] UpdatePageContentDTO model)
        {
            var result = _pageContentService.Update(model);
            return CommonResponse(result);
        }
    }
}