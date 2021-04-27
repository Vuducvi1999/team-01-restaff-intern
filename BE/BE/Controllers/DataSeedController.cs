using Common.Constants;
using Domain.DTOs.DataSeed;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.DataSeed;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseInformationWebsite)]
    [ApiController]
    public class DataSeedController : BaseController
    {

        private readonly IDataSeedService _dataSeedService;
        public DataSeedController(IDataSeedService dataSeedService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _dataSeedService = dataSeedService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] Guid id)
        {

            var result = _dataSeedService.GetDataSeed(id);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateDataSeedDTO model)
        {
            var result = _dataSeedService.Update(model);

            return CommonResponse(result);
        }
    }
}
