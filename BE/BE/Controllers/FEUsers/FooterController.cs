﻿using BE.Controllers;
using Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Footer;
using Service.Header;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers.FEUsers
{
    [Route(UrlConstants.BaseFooter)]
    [ApiController]

    public class FooterController : BaseController
    {
        private readonly IFooterService _footerService;

        public FooterController(IFooterService footerService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _footerService = footerService;
        }

        [HttpGet]
        [Route(CodeConstants.Categories)]
        public IActionResult GetCategories()
        {
            var result = _footerService.GetCategories();
            return CommonResponse(result);
        }

        [HttpGet]
        [Route(CodeConstants.SocialMedias)]
        public IActionResult GetSocialMedias()
        {
            var result = _footerService.GetSocialMedias();
            return CommonResponse(result);
        }

    }
}
