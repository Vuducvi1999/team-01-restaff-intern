using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.MD5;
using Domain.DTOs.User;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
using System;
using System.Linq;

namespace Service.Profiles
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;
        private readonly IAuthService _authService;



        public ProfileService(IRepository<User> userRepository, IUnitOfWork unitOfWork, IMapper mapper, IUserManager userManager, IAuthService authService)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _authService = authService;
        }

        public ReturnMessage<UpdateUserDTO> ChangePassword(ChangePasswordUserDTO model)
        {
            try
            {
                var entity = _userRepository.Queryable().FirstOrDefault(it => (it.Username == model.Username) && (it.Password == MD5Helper.ToMD5Hash(model.Password)) );
                if (entity.IsNotNullOrEmpty() && (model.ConfirmNewPassword == model.NewPassword))
                {
                    entity.ChangePassword(model);
                    _userRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<UpdateUserDTO>(false, _mapper.Map<User, UpdateUserDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;
                }
                return new ReturnMessage<UpdateUserDTO>(false, null, MessageConstants.InvalidAuthInfoMsg);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<UpdateUserDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<UserDataReturnDTO> Update(UpdateUserDTO model)
        {
            try
            {
                var entity = _userRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _userRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<UserDataReturnDTO>(false, _mapper.Map<User, UserDataReturnDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<UserDataReturnDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<UserDataReturnDTO>(true, null, ex.Message);
            }
        }
    }
}
