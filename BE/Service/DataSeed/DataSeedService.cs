using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.DataSeed;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataSeed
{
    public class DataSeedService : IDataSeedService
    {

        private readonly IRepository<DataSeedWebsite> _dataSeedRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DataSeedService(IRepository<DataSeedWebsite> dataSeedRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _dataSeedRepository = dataSeedRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public ReturnMessage<DataSeedDTO> GetDataSeed(Guid id)
        {
            var entity = _dataSeedRepository.Find(id); 

            var data = _mapper.Map<DataSeedWebsite, DataSeedDTO>(entity);

            var result = new ReturnMessage<DataSeedDTO>(false, data, MessageConstants.ListSuccess);

            return result;
        }

        public ReturnMessage<DataSeedDTO> Update(UpdateDataSeedDTO model)
        {
            var entity = _dataSeedRepository.Find(model.Id);

            var data = _mapper.Map<DataSeedWebsite, DataSeedDTO>(entity);

            if (entity.IsNotNullOrEmpty())
            {
                entity.Update(model);
                _dataSeedRepository.Update(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<DataSeedDTO>(false, data, MessageConstants.UpdateSuccess);
                return result;
            }
            return new ReturnMessage<DataSeedDTO>(true, null, MessageConstants.Error);

        }
    }
}
