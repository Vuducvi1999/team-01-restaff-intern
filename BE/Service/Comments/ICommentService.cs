using Common.Http;
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
        public ReturnMessage<PaginatedList<CommentDTO>> SearchPagination(SerachPaginationDTO<CommentDTO> search);
        public ReturnMessage<List<CommentDTO>> GetAll();
        public ReturnMessage<CommentDTO> Create(CreateCommentDTO model);
        public ReturnMessage<CommentDTO> Delete(DeleteCommentDTO model);
    }
}
