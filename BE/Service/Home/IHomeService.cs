using Common.Http;
using Domain.DTOs.Home;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Home
{
    public interface IHomeService
    {
        public ReturnMessage<List<HomeProductDTO>> GetTopCollectionProducts();
        public ReturnMessage<List<HomeProductDTO>> GetNewProducts();
        public ReturnMessage<List<HomeProductDTO>> GetBestSellerProducts();
        public ReturnMessage<List<HomeProductDTO>> GetFeaturedProducts();
        public ReturnMessage<List<HomeProductDTO>> GetOnSaleProducts();
        public ReturnMessage<List<HomeBlogDTO>> GetBlogs();
        public ReturnMessage<List<HomeBannerDTO>> GetBanners();
    }
}
