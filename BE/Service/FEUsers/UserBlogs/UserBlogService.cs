﻿using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Blogs;
using Domain.Entities;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.UserBlogs
{
    public class UserBlogService : IUserBlogService
    {
        private readonly IRepository<Blog> _blogRepository;
        private readonly IMapper _mapper;

        public UserBlogService(IRepository<Blog> blogRepository, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
        }

        public ReturnMessage<BlogDTO> GetBlog(Guid id)
        {
            try
            {
                var entity = _blogRepository.Find(id);
                return new ReturnMessage<BlogDTO>(false, _mapper.Map<Blog, BlogDTO>(entity), MessageConstants.DeleteSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BlogDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<List<BlogDTO>> RecentBlog(List<BlogDTO> model)
        {
            if (model == null)
            {
                return new ReturnMessage<List<BlogDTO>>(false, null, MessageConstants.DeleteSuccess);
            }
            var resultRecent = _blogRepository.Queryable().OrderBy(p => p.CreateByDate).Take(5).ToList();
            var data = _mapper.Map<List<Blog>, List<BlogDTO>>(resultRecent);
            var result = new ReturnMessage<List<BlogDTO>>(false, data, MessageConstants.SearchSuccess);
            return result;
        }

        public ReturnMessage<List<BlogDTO>> TopBlog(List<BlogDTO> model)
        {
            if (model == null)
            {
                return new ReturnMessage<List<BlogDTO>>(false, null, MessageConstants.DeleteSuccess);
            }
            var resultTop = _blogRepository.Queryable().OrderBy(p => p.Title).Take(3).ToList();
            var data = _mapper.Map<List<Blog>, List<BlogDTO>>(resultTop);
            var result = new ReturnMessage<List<BlogDTO>>(false, data, MessageConstants.SearchSuccess);
            return result;
        }

        public ReturnMessage<PaginatedList<BlogDTO>> SearchPagination(SearchPaginationDTO<BlogDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<BlogDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _blogRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Title.Contains(search.Search.Title) ||
                        it.ShortDes.Contains(search.Search.ShortDes) ||
                        it.ContentHTML.Contains(search.Search.ContentHTML) ||
                        it.ImageUrl.Contains(search.Search.ImageUrl)
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.CreateByDate
            );
            var data = _mapper.Map<PaginatedList<Blog>, PaginatedList<BlogDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<BlogDTO>>(false, data, MessageConstants.GetPaginationSuccess);
            return result;
        }
    }
}
