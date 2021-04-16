using Common.Http;
using Domain.DTOs.User;


namespace Service.Profiles
{
    public interface IProfileService
    {
        ReturnMessage<UserDataReturnDTO> Update(UpdateUserDTO model);
        ReturnMessage<UpdateUserDTO> ChangePassword(ChangePasswordUserDTO model);

    }
}
