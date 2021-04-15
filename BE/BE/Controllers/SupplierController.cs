using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Suppliers;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Suppliers;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseSupplier)]
    [ApiController]
    public class SupplierController : BaseController
    {
        private readonly ISupplierService _supplierService;


        public SupplierController(ISupplierService supplierService, IAuthService authService, IUserManager authManager) : base(authService, authManager)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<SupplierDTO> serachPagination)
        {

            var result = _supplierService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromForm] CreateSupplierDTO model)
        {
            var result = _supplierService.Create(model);
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromForm] UpdateSupplierDTO model)
        {
            var result = _supplierService.Update(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteSupplierDTO model)
        {
            var result = _supplierService.Delete(model);
            return CommonResponse(result);
        }
    }
}
