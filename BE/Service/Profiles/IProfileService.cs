using Common.Http;
using Domain.DTOs.User;


namespace Service.Profiles
{
    public interface IProfileService
    {
        ReturnMessage<UpdateUserDTO> Update(UpdateUserDTO model);
    }
}
