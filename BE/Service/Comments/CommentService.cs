using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Comments;
using Domain.DTOs.Users;
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
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Blog> _blogRepository;
        private readonly IUserManager _userManager;
        private readonly UserInformationDTO _userInformation;

        public CommentService(IRepository<Comment> commentRepository, IUnitOfWork unitOfWork, IMapper mapper, IUserManager userManager, IRepository<Product> productRepository, IRepository<Blog> blogRepository)
        {
            _commentRepository = commentRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _userInformation = _userManager.GetInformationUser();
            _productRepository = productRepository;
            _blogRepository = blogRepository;
        }

        public ReturnMessage<CommentDTO> Create(CreateCommentDTO model)
        {
            try
            {
                if(String.IsNullOrEmpty(model.Content.Trim()))
                    return new ReturnMessage<CommentDTO>(true, null, MessageConstants.EmptyContentComment);

                var beforeComment = _commentRepository.Queryable()
                                    .Where(i => i.CustomerId == _userInformation.CustomerId && i.EntityId == model.EntityId)
                                    .OrderByDescending(i => i.CreateByDate)
                                    .FirstOrDefault();
                if(beforeComment.IsNotNullOrEmpty())
                {
                    var SubtractionTime = (DateTime.Now - beforeComment.CreateByDate);
                    if (SubtractionTime.TotalHours < 1)
                    {
                        var NextTimeToComment = Convert.ToInt32((beforeComment.CreateByDate.AddMinutes(60) - DateTime.Now).TotalMinutes).ToString();
                        return new ReturnMessage<CommentDTO>(true, null, MessageConstants.CommentAfterATime + NextTimeToComment + " minutes");
                    }
                }

                var entity = _mapper.Map<CreateCommentDTO, Comment>(model);
                entity.CustomerId = _userInformation.CustomerId;
                entity.FullName = _userInformation.FirstName + " " + _userInformation.LastName;
                entity.Insert();
                
                _commentRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CommentDTO>(false, _mapper.Map<Comment, CommentDTO>(entity), MessageConstants.CreateSuccess);

                var ratingEntity = _commentRepository.Queryable().Where(p => p.EntityId == model.EntityId);
                decimal ratingScore = (decimal)Math.Round(ratingEntity.Average(x => x.Rating), 1);

                var productEntity = _productRepository.Queryable().FirstOrDefault(p => p.Id == model.EntityId);
                if (productEntity.IsNullOrEmpty())
                {
                    var blogEntity = _blogRepository.Queryable().FirstOrDefault(p => p.Id == model.EntityId);
                    blogEntity.RatingScore = ratingScore;
                    blogEntity.ObjectState = ObjectState.Modified;
                    _unitOfWork.SaveChanges();
                    return result;
                }

                productEntity.RatingScore = ratingScore;
                productEntity.ObjectState = ObjectState.Modified;
                _unitOfWork.SaveChanges();
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

        public ReturnMessage<decimal> GetRating(Guid entityId)
        {
            try
            {
                var entity = _commentRepository.Queryable().FirstOrDefault(p => p.EntityId == entityId);
                if (entity.IsNotNullOrEmpty())
                {
                    decimal ratingPoint = 0;
                    if (entity.EntityType.Contains("Product"))
                    {
                        ratingPoint = _productRepository.Queryable().FirstOrDefault(p => p.Id == entityId).RatingScore;
                        return new ReturnMessage<decimal>(false, ratingPoint, MessageConstants.ListSuccess);
                    }
                    ratingPoint = _blogRepository.Queryable().FirstOrDefault(p => p.Id == entityId).RatingScore;
                    var result = new ReturnMessage<decimal>(false, ratingPoint, MessageConstants.ListSuccess);
                    return result;
                }
                return new ReturnMessage<decimal>(false, 0, MessageConstants.CreateFail);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<decimal>(true, 0, ex.Message);
            }
        }
    }
}
