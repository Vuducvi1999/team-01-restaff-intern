using Common.Http;
using Common.Pagination;
using Domain.DTOs.Suppliers;
using Infrastructure.EntityFramework;
using Service.Common;
namespace Service.Suppliers
{
    public interface ISupplierService : ICommonCRUDService<SupplierDTO, CreateSupplierDTO, UpdateSupplierDTO, DeleteSupplierDTO>
    {
        ReturnMessage<PaginatedList<SupplierDTO>> SearchPagination(SerachPaginationDTO<SupplierDTO> search);
    }
}
