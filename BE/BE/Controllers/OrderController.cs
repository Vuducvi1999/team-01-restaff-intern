using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Orders;
using Domain.DTOs.Suppliers;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Orders;
using Service.Files;
using System;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseOrder)]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;


        public OrderController(IOrderService orderService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<OrderDTO> serachPagination)
        {
            var result = _orderService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }


        [HttpGet]
        [Route("by-id")]
        public IActionResult GetById([FromQuery] Guid id)
        {
            var result = _orderService.GetById(id);
            return CommonResponse(result);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateOrderDTO model)
        {
            var result = _orderService.Create(model);
            //if (model.Files.IsNullOrEmpty() || result.HasError)
            //{
            //    return CommonResponse(result);
            //}
            //var uploadImage = _fileService.UpdateIdFile(model.Files, result.Data.Id);
            //if (uploadImage.HasError)
            //{
            //    return CommonResponse(uploadImage);
            //}
            return CommonResponse(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateOrderDTO model)
        {
            var result = _orderService.Update(model);
            //if (model.Files.IsNullOrEmpty() || result.HasError)
            //{
            //    return CommonResponse(result);
            //}
            //var uploadImage = _fileService.UpdateIdFile(model.Files, result.Data.Id);
            //if (uploadImage.HasError)
            //{
            //    return CommonResponse(uploadImage);
            //}
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteOrderDTO model)
        {
            var result = _orderService.Delete(model);
            return CommonResponse(result);
        }
    }
}
