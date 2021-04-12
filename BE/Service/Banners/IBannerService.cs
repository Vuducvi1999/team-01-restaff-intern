﻿using Common.Http;
using Common.Pagination;
using Domain.DTOs.Banners;
using Infrastructure.EntityFramework;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Banners
{
    interface IBannerService : ICommonCRUDService<BannerDTO, CreateBannerDTO, UpdateBannerDTO, DeleteBannerDTO>
    {
        ReturnMessage<PaginatedList<BannerDTO>> SearchPagination(SerachPaginationDTO<BannerDTO> search);
    }
}
