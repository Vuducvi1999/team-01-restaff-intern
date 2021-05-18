using Common.Http;
using Infrastructure.EntityFramework;
using System;

using Domain.DTOs.InfomationWeb;
using Domain.Entities;
using AutoMapper;
using Common.Constants;
using Infrastructure.Extensions;

namespace Service.InformationWebsiteServices
{
    public class InformationWebService : IInfomationWebService
    {
        private readonly IRepository<InformationWebsite> _informationWebRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public InformationWebService(IRepository<InformationWebsite> informationWebRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _informationWebRepository = informationWebRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public ReturnMessage<InformationWebDTO> GetInfo()
        {
            var entity = _informationWebRepository.Find(CommonConstants.WebSiteInformationId);

            if(entity == null)
            {
                return new ReturnMessage<InformationWebDTO>(true, null, MessageConstants.CommonError);
            }

            var data = _mapper.Map<InformationWebsite, InformationWebDTO>(entity);

            var result = new ReturnMessage<InformationWebDTO>(false, data, MessageConstants.ListSuccess);

            return result;
        }

        public ReturnMessage<InformationWebDTO> Update(UpdateInformationWebDTO model)
        {
            try
            {
                var entity = _informationWebRepository.Find(CommonConstants.WebSiteInformationId);
                if(entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _informationWebRepository.Update(entity);
                    _unitOfWork.SaveChanges();

                    var result = new ReturnMessage<InformationWebDTO>(false, _mapper.Map<InformationWebsite, InformationWebDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;
                }
                return new ReturnMessage<InformationWebDTO>(true, null, MessageConstants.Error);
            }
            catch(Exception ex)
            {

                return new ReturnMessage<InformationWebDTO>(true, null, ex.Message);
            }

        }
    }
}
