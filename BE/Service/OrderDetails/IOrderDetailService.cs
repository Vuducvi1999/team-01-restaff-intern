﻿using Common.Http;
using Common.Pagination;
using Domain.DTOs.OrderDetails;
using Domain.DTOs.Orders;
using Infrastructure.EntityFramework;
using Service.Common;
using System;
using System.Collections.Generic;

namespace Service.OrderDetails

{
    public interface IOrderDetailService : ICommonCRUDService<OrderDetailDTO, CreateOrderDetailDTO, UpdateOrderDetailDTO, DeleteOrderDetailDTO>
    {
        ReturnMessage<PaginatedList<OrderDetailDTO>> SearchPagination(SerachPaginationDTO<OrderDetailDTO> search);
        ReturnMessage<List<OrderDetailDTO>> GetByOrder(Guid Id);

    }
}