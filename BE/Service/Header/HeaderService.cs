using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.Categories;
using Domain.DTOs.SocialMedias;
using Domain.Entities;
using Infrastructure.EntityFramework;
using System.Collections.Generic;

namespace Service.Header
{
    public class HeaderService : IHeaderService
    {
        private readonly IRepository<SocialMedia> _socialMediaRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public HeaderService(IRepository<SocialMedia> socialMediaRepository, IRepository<Category> categoryRepository, IMapper mapper)
        {
            _socialMediaRepository = socialMediaRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public ReturnMessage<List<CategoryDTO>> GetCategories()
        {
            var listDTO = _categoryRepository.GetList();
            var list = _mapper.Map<List<CategoryDTO>>(listDTO);
            var result = new ReturnMessage<List<CategoryDTO>>(false, list, MessageConstants.ListSuccess);
            return result;
        }

        public ReturnMessage<List<SocialMediaDTO>> GetSocialMedias()
        {
            var listDTO = _socialMediaRepository.GetList();
            var list = _mapper.Map<List<SocialMediaDTO>>(listDTO);
            var result = new ReturnMessage<List<SocialMediaDTO>>(false, list, MessageConstants.ListSuccess);
            return result;
        }
    }
}
