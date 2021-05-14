using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Comments;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.Comments
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> _commentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;


        public CommentService(IRepository<Comment> commentRepository, IUnitOfWork unitOfWork, IMapper mapper, IUserManager userManager)
        {
            _commentRepository = commentRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        public ReturnMessage<CommentDTO> Create(CreateCommentDTO model)
        {
            try
            {
                //var userDecompile = _userManager.GetInformationUser();
                var entity = _mapper.Map<CreateCommentDTO, Comment>(model);
                //entity.CustomerId = userDecompile.CustomerId;
                entity.Insert();
                _commentRepository.Insert(entity);
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
                var entity = _commentRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _commentRepository.Delete(entity);
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

        public ReturnMessage<PaginatedList<CommentDTO>> BlogPagination(SerachPaginationDTO<CommentDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CommentDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _commentRepository.GetPaginatedList(it => it.EntityType.Contains("Blog") && 
                (
                    search.Search == null ||
                    (
                        it.Content.Contains(search.Search.Content)||
                        it.FullName.Contains(search.Search.FullName) ||
                        it.CustomerId == (search.Search.CustomerId) ||
                        it.EntityId == (search.Search.EntityId)
                    )
                )
                , search.PageSize
                , search.PageIndex * search.PageSize
                , t => t.CreateByDate
            );
            var data = _mapper.Map<PaginatedList<Comment>, PaginatedList<CommentDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CommentDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }

        public ReturnMessage<PaginatedList<CommentDTO>> ProductPagination(SerachPaginationDTO<CommentDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CommentDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _commentRepository.GetPaginatedList(it => it.EntityType.Contains("Product") &&
                (
                    search.Search == null ||
                    (
                        it.Content.Contains(search.Search.Content) ||
                        it.FullName.Contains(search.Search.FullName) ||
                        it.CustomerId == (search.Search.CustomerId) ||
                        it.EntityId == (search.Search.EntityId)
                    )
                )
                , search.PageSize
                , search.PageIndex * search.PageSize
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
                var entity = _commentRepository.Queryable().OrderByDescending(t => t.CreateByDate).ToList();
                var data = _mapper.Map<List<Comment>, List<CommentDTO>>(entity);
                var result = new ReturnMessage<List<CommentDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<List<CommentDTO>>(true, null, ex.Message);
            }
        }


        public ReturnMessage<decimal> GetRating(Guid entityId)
        {
            if (entityId.IsNullOrEmpty() && entityId == Guid.Empty)
            {
                return new ReturnMessage<decimal>(true, 0, MessageConstants.Error);
            }
            try
            {
                var entity = _commentRepository.Queryable().Where(p => p.EntityId == entityId)
                                                .OrderByDescending(i => i.CreateByDate)
                                                .ToList()
                                                .GroupBy(t => t.CustomerId)
                                                .Select(i => i.First());

                if (entity.Count() == 0)
                {
                    return new ReturnMessage<decimal>(false, 0, MessageConstants.DataError);
                }
                decimal rating = (decimal)Math.Round(entity.Average(x => x.Rating), 1);
                return new ReturnMessage<decimal>(false, rating, MessageConstants.GetSuccess);
            }
            catch(Exception ex)
            {
                return new ReturnMessage<decimal>(true, 0, ex.Message);
            }
        }
    }
}
