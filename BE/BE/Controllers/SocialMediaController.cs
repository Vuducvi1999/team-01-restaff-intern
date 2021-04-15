using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.SocialMedias;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.SocialMedias;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseSocialMedia)]
    [ApiController]
    public class SocialMediaController : BaseController
    {
        private readonly ISocialMediaService _socialMediaService;

        public SocialMediaController(ISocialMediaService socialMediaService)
        {
            _socialMediaService = socialMediaService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<SocialMediaDTO> serachPagination)
        {

            var result = _socialMediaService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateSocialMediaDTO model)
        {
            var result = _socialMediaService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateSocialMediaDTO model)
        {
            var result = _socialMediaService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteSocialMediaDTO model)
        {
            var result = _socialMediaService.Delete(model);
            return CommonResponse(result);
        }
    }
}
