using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.User;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
using System;


namespace Service.Profiles
{
    public class ProfileService : IProfileService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;


        public ProfileService(IRepository<User> userRepository, IUnitOfWork unitOfWork, IMapper mapper, IUserManager userManager)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        public ReturnMessage<UpdateUserDTO> Update(UpdateUserDTO model)
        {
            try
            {
                var entity = _userRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _userRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<UpdateUserDTO>(false, _mapper.Map<User, UpdateUserDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<UpdateUserDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<UpdateUserDTO>(true, null, ex.Message);
            }
        }
    }
}
