using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Categories;
using Service.Files;
using System;
using System.Collections.Generic;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseCategory)]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<CategoryDTO> serachPagination)
        {

            var result = _categoryService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCategoryDTO model)
        {
            var result = _categoryService.Create(model);
            if(model.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            //var uploadImage = _fileService.UpdateImageCategory(model.Images, result.Data.Id);
            //if (uploadImage.HasError)
            //{
            //    return CommonResponse(uploadImage);
            //}
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateCategoryDTO model)
        {
            var result = _categoryService.Update(model);
            if (model.IsNullOrEmpty())
            {
                return CommonResponse(result);
            }
            //var uploadImage = _fileService.UpdateImageCategory(model.Images, model.Id);
            //if (uploadImage.HasError)
            //{
            //    return CommonResponse(uploadImage);
            //}
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteCategoryDTO model)
        {
            var result = _categoryService.Delete(model);
            return CommonResponse(result);
        }
    }
}
