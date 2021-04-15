using Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BE.Controllers
{
    [Route(UrlConstants.BaseFile)]
    [ApiController]
    public class FileController : BaseController
    {
        public FileController(IAuthService authService, IUserManager userManager) : base(authService,userManager)
        {

        }

        [HttpGet]
        public string GetFile([FromQuery] int id)
        {
            return "value";
        }

        [HttpPost]
        public void SaveFile([FromForm] string value)
        {
        }

        [HttpPost(UrlConstants.BaseFileDownload)]
        public void DownloadFile([FromForm] string value)
        {
        }

    }
}
