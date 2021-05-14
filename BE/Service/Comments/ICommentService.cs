﻿using Common.Http;
using Common.Pagination;
using Domain.DTOs.Comments;
using Infrastructure.EntityFramework;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Comments
{
    public interface ICommentService
    {
        public ReturnMessage<PaginatedList<CommentDTO>> BlogPagination(SerachPaginationDTO<CommentDTO> search);
        public ReturnMessage<PaginatedList<CommentDTO>> ProductPagination(SerachPaginationDTO<CommentDTO> search);
        public ReturnMessage<List<CommentDTO>> GetAll();
        public ReturnMessage<CommentDTO> Create(CreateCommentDTO model);
        public ReturnMessage<CommentDTO> Delete(DeleteCommentDTO model);
        public ReturnMessage<decimal> GetRating(Guid entityId);

    }
}
