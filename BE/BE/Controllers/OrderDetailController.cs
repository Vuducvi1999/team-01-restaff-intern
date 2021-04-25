using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.OrderDetails;
using Domain.DTOs.Orders;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using Service.OrderDetails;

namespace BE.Controllers
{
    [Route(UrlConstants.BaseOrderDetail)]
    [ApiController]
    public class OrderDetailController : BaseController
    {
        private readonly IOrderDetailService _orderDetailService;


        public OrderDetailController(IOrderDetailService orderDetailService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _orderDetailService = orderDetailService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<OrderDetailDTO> serachPagination)
        {
            var result = _orderDetailService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateOrderDetailDTO model)
        {
            var result = _orderDetailService.Create(model);
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
        public IActionResult Update([FromBody] UpdateOrderDetailDTO model)
        {
            var result = _orderDetailService.Update(model);
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
        public IActionResult Delete([FromQuery] DeleteOrderDetailDTO model)
        {
            var result = _orderDetailService.Delete(model);
            return CommonResponse(result);
        }
    }
}
