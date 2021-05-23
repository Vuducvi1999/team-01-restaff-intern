using Common.Http;
using Domain.DTOs.PageContent;
using Domain.DTOs.PageContentContact;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.PageContents
{
    public interface IPageContentService
    {
        public ReturnMessage<List<PageContentDTO>> GetList();
        public ReturnMessage<PageContentDTO> GetById(Guid id);
        public ReturnMessage<PageContentDTO> Update(UpdatePageContentDTO dataUpdate);
        public ReturnMessage<PageContentDTO> Create(CreatePageContentDTO data);
    }
}
