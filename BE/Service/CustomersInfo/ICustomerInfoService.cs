using Common.Http;
using Common.Pagination;
using Domain.DTOs.Customer;
using Domain.DTOs.CustomerInfo;
using Infrastructure.EntityFramework;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Customers
{
    public interface ICustomerInfoService : ICommonCRUDService<CustomerInfoDTO, CreateCustomerInfoDTO, UpdateCustomerInfoDTO, DeleteCustomerInfoDTO>
    {
        ReturnMessage<PaginatedList<CustomerInfoDTO>> SearchPagination(SerachPaginationDTO<CustomerInfoDTO> search);
    }
}
