using Common.Http;
using Common.Paganation;
using Domain.DTOs.Suppliers;
using Infrastructure.EntityFramework;
using Service.Common;
namespace Service.Suppliers
{
    public interface ISupplierService : ICommonCRUDService<SupplierDTO, CreateSupplierDTO, UpdateSupplierDTO, DeleteSupplierDTO>
    {
        ReturnMessage<PaginatedList<SupplierDTO>> SearchPagination(SerachPaganationDTO<SupplierDTO> search);
    }
}
