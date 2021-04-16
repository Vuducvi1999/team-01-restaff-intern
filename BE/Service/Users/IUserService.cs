using Common.Http;
using Common.Pagination;
using Domain.DTOs.Users;
using Infrastructure.EntityFramework;
using Service.Common;

namespace Service.Users
{
    public interface IUserService : ICommonCRUDService<UserDTO, CreateUserDTO, UpdateUserDTO, DeleteUserDTO>
    {
        ReturnMessage<PaginatedList<UserDTO>> SearchPagination(SerachPaginationDTO<UserDTO> search);
    }
}
