using Common.Constants;
using Common.Http;
using Common.Paganation;
using Domain.DTOs.Suppliers;
using Infrastructure.EntityFramework;
using Microsoft.AspNetCore.Mvc;
using Service.Suppliers;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseSupplier)]
    [ApiController]
    public class SupplierController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISupplierService _supplierService;

        public IUnitOfWork UnitOfWork => _unitOfWork;

        public SupplierController(IUnitOfWork unitOfWork, ISupplierService supplierService)
        {
            _unitOfWork = unitOfWork;
            _supplierService = supplierService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaganationDTO<SupplierDTO> serachPaganation)
        {

            var result = _supplierService.SearchPagination(serachPaganation);
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
        public IActionResult Deletemodel([FromQuery] DeleteSupplierDTO model)
        {
            var result = _supplierService.Delete(model);
            return CommonResponse(result);
        }
    }
}
