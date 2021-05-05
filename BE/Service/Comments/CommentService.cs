using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Comments;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.Comments
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentService(IRepository<Comment> repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CommentDTO> Create(CreateCommentDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateCommentDTO, Comment>(model);
                entity.Insert();
                _repository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CommentDTO>(false, _mapper.Map<Comment, CommentDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<CommentDTO>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<CommentDTO> Delete(DeleteCommentDTO model)
        {
            try
            {
                var entity = _repository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _repository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CommentDTO>(false, _mapper.Map<Comment, CommentDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CommentDTO>(true, null, MessageConstants.Error);
            }
            catch(Exception ex)
            {
                return new ReturnMessage<CommentDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CommentDTO>> SearchPagination(SerachPaginationDTO<CommentDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CommentDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _repository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Content.Contains(search.Search.Content)||
                        it.FullName.Contains(search.Search.FullName) ||
                        it.CustomerId == (search.Search.CustomerId) ||
                        it.EntityId == (search.Search.EntityId) ||
                        it.EntityType.Contains(search.Search.EntityType)
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.CreateByDate
            );
            var data = _mapper.Map<PaginatedList<Comment>, PaginatedList<CommentDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CommentDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }

        public ReturnMessage<List<CommentDTO>> GetAll()
        {
            try
            {
                var entity = _repository.Queryable().OrderByDescending(t => t.CreateByDate).ToList();
                var data = _mapper.Map<List<Comment>, List<CommentDTO>>(entity);
                var result = new ReturnMessage<List<CommentDTO>>(false, data, MessageConstants.DeleteSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<List<CommentDTO>>(true, null, ex.Message);
            }
        }
    }
}
