using Common.Http;
using Domain.DTOs.User;
using System;

namespace Service.Auth
{
    public interface IAuthService
    {
        public ReturnMessage<UserDataReturnDTO> CheckLogin(UserLoginDTO data);
        public UserDataReturnDTO GetInformationAuth(Guid id);
    }
}
