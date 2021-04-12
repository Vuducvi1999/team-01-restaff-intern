using Common.Http;
using Common.Pagination;
using Domain.DTOs.SocialMedias;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.SocialMedias
{
    public class SocialMediaService : ISocialMediaService
    {
        public ReturnMessage<SocialMediaDTO> Create(CreateSocialMediaDTO model)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<SocialMediaDTO> Delete(DeleteSocialMediaDTO model)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<PaginatedList<SocialMediaDTO>> SearchPagination(SerachPaginationDTO<SocialMediaDTO> search)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<SocialMediaDTO> Update(UpdateSocialMediaDTO model)
        {
            throw new NotImplementedException();
        }
    }
}
