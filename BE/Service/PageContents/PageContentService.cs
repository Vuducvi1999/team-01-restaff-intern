using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.PageContent;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.PageContents
{
    public class PageContentService : IPageContentService
    {
        private readonly IRepository<PageContent> _pageContentRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public PageContentService(IRepository<PageContent> pageContentRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _pageContentRepository = pageContentRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public ReturnMessage<List<PageContentDTO>> GetList()
        
        {
            try
            {
                var resultEntity = _pageContentRepository.Queryable().OrderBy(i=>i.Order).Take(12).ToList();
                var data = _mapper.Map<List<PageContent>, List<PageContentDTO>>(resultEntity);
                var result = new ReturnMessage<List<PageContentDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<PageContentDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<PageContentDTO> GetById(Guid id)

        {
            try
            {
                var resultEntity = _pageContentRepository.Find(id);
                var data = _mapper.Map<PageContent, PageContentDTO>(resultEntity);
                var result = new ReturnMessage<PageContentDTO>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<PageContentDTO>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<PageContentDTO> Update(UpdatePageContentDTO model)
        {
            try
            {
                var entity = _pageContentRepository.Find(model.Id);
                if (!entity.IsNotNullOrEmpty())
                    return new ReturnMessage<PageContentDTO>(true, null, MessageConstants.Error);
                entity.Update(model);
                _pageContentRepository.Update(entity);
                _unitOfWork.SaveChanges();

                var data = _mapper.Map<PageContent, PageContentDTO>(entity);
                var result = new ReturnMessage<PageContentDTO>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<PageContentDTO>(true, null, MessageConstants.Error);
            }
        }
    }
}
