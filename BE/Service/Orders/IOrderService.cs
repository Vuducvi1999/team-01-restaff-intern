﻿using Common.Http;
using Common.Pagination;
using Domain.DTOs.Orders;
using Infrastructure.EntityFramework;
using Service.Common;
using System.Collections.Generic;

namespace Service.Orders

{
    public interface IOrderService : ICommonCRUDService<OrderDTO, CreateOrderDTO, UpdateOrderDTO, DeleteOrderDTO>
    {
        ReturnMessage<PaginatedList<OrderDTO>> SearchPagination(SerachPaginationDTO<OrderDTO> search);
    }
}
