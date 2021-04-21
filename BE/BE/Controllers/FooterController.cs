using Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.Header;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseFooter)]
    [ApiController]

    public class FooterController : BaseController
    {
        private readonly IHeaderService _headerService;

        public FooterController(IHeaderService headerService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _headerService = headerService;
        }

        [HttpGet]
        [Route("categories")]
        public IActionResult GetCategories()
        {
            var result = _headerService.GetCategories();
            return CommonResponse(result);
        }

        //[HttpGet]
        //[Route("social-medias")]
        //public IActionResult GetSocialMedias()
        //{
        //    var result = _headerService.GetSocialMedias();
        //    return CommonResponse(result);
        //}

    }
}
