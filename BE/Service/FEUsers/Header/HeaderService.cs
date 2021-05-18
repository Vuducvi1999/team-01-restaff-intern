using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.Blogs;
using Domain.DTOs.Categories;
using Domain.DTOs.SocialMedias;
using Domain.Entities;
using Infrastructure.EntityFramework;
using System.Collections.Generic;
using System.Linq;

namespace Service.Header
{
    public class HeaderService : IHeaderService
    {
        private readonly IRepository<SocialMedia> _socialMediaRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Blog> _blogRepository;

        private readonly IMapper _mapper;

        public HeaderService(IRepository<SocialMedia> socialMediaRepository, IRepository<Category> categoryRepository, IMapper mapper, IRepository<Blog> blogRepository)
        {
            _socialMediaRepository = socialMediaRepository;
            _categoryRepository = categoryRepository;
            _blogRepository = blogRepository;
            _mapper = mapper;
        }

        public ReturnMessage<List<BlogDTO>> GetBlogs()
        {
            var listDTO = _blogRepository.GetList();
            var list = _mapper.Map<List<BlogDTO>>(listDTO);
            var result = new ReturnMessage<List<BlogDTO>>(false, list, MessageConstants.ListSuccess);
            return result;
        }

        public ReturnMessage<List<CategoryDTO>> GetCategories()
        {
            var listDTO = _categoryRepository.Queryable().Where(it => !it.IsDeleted).OrderBy(it => it.Name).ThenBy(it => it.Name.Length).ToList();
            var list = _mapper.Map<List<CategoryDTO>>(listDTO);
            var result = new ReturnMessage<List<CategoryDTO>>(false, list, MessageConstants.ListSuccess);
            return result;
        }

        //public ReturnMessage<List<SocialMediaDTO>> GetSocialMedias()
        //{
        //    var listDTO = _socialMediaRepository.GetList();
        //    var list = _mapper.Map<List<SocialMediaDTO>>(listDTO);
        //    var result = new ReturnMessage<List<SocialMediaDTO>>(false, list, MessageConstants.ListSuccess);
        //    return result;
        //}
    }
}
