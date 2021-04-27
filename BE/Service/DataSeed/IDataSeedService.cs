using Common.Http;
using Domain.DTOs.DataSeed;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataSeed
{
    public interface IDataSeedService : ICommonCRUDService<DataSeedDTO, UpdateDataSeedDTO>
    {
        ReturnMessage<DataSeedDTO> GetDataSeed(Guid id);

    }
}
