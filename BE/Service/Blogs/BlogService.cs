﻿using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Blogs;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Blogs
{
    public class BlogService : IBlogService
    {
        private readonly IRepository<Blog> _blogRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BlogService(IRepository<Blog> blogRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<BlogDTO> Create(CreateBlogDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateBlogDTO, Blog>(model);
                TrimData(entity);
                entity.Insert();
                _blogRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<BlogDTO>(false, _mapper.Map<Blog, BlogDTO>(entity), MessageConstants.CreateSuccess);
                return result; 
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BlogDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<BlogDTO> Delete(DeleteBlogDTO model)
        {
            try
            {
                var entity = _blogRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _blogRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<BlogDTO>(false, _mapper.Map<Blog, BlogDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<BlogDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BlogDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<BlogDTO> Update(UpdateBlogDTO model)
        {
            try
            {
                var entity = _blogRepository.Find(model.Id);
                TrimData(entity);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _blogRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<BlogDTO>(false, _mapper.Map<Blog, BlogDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;

                }
                return new ReturnMessage<BlogDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BlogDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<BlogDTO>> SearchPagination(SerachPaginationDTO<BlogDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<BlogDTO>>(false, null, MessageConstants.DeleteSuccess);
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
                , t => t.Title
            );
            var data = _mapper.Map<PaginatedList<Blog>, PaginatedList<BlogDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<BlogDTO>>(false, data, MessageConstants.DeleteSuccess);
            return result;
        }

        private void TrimData(Blog blog)
        {
            blog.Title = blog.Title.Trim();
            blog.ShortDes = blog.ShortDes.Trim();
        }
        
    }
}