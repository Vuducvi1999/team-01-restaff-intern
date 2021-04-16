using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Categories;


namespace BE.Controllers
{
    [Route(UrlConstants.BaseCategory)]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService, IAuthService authService, IUserManager userManager) : base(authService, userManager)
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
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateCategoryDTO model)
        {
            var result = _categoryService.Update(model);
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
