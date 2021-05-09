using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.Home;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Home
{
    public class HomeService : IHomeService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Blog> _blogRepository;
        private readonly IRepository<Banner> _bannerRepository;
        private readonly IMapper _mapper;

        public HomeService(IRepository<Product> productRepository, IRepository<Blog> blogRepository,IRepository<Banner> bannerRepository,IMapper mapper)
        {
            _productRepository = productRepository;
            _bannerRepository = bannerRepository;
            _blogRepository = blogRepository;
            _bannerRepository = bannerRepository;
            _mapper = mapper;
        }


        public ReturnMessage<List<HomeProductDTO>> GetTopCollectionProducts()
        {
            try
            {
                var resultEntity = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category))
                                    .AsQueryable()
                                    .Take(12)
                                    .ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeProductDTO>> GetBestSellerProducts()
        {
            try
            {
                var resultEntity = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category))
                                    .AsQueryable()
                                    .Take(12)
                                    .ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeProductDTO>> GetFeaturedProducts()
        {
            try
            {
                var resultEntity = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category))
                                    .AsQueryable()
                                    .Take(12)
                                    .ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeProductDTO>> GetNewProducts()
        {
            try
            {
                var resultEntity = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category))
                                    .AsQueryable()
                                    .Take(12)
                                    .ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeProductDTO>> GetOnSaleProducts()
        {
            try
            {
                var resultEntity = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category))
                                    .AsQueryable()
                                    .Take(12)
                                    .ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);

                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeBlogDTO>> GetBlogs()
        {
            try
            {
                var resultEntity = _blogRepository.Queryable().Take(12).ToList();
                var data = _mapper.Map<List<Blog>, List<HomeBlogDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeBlogDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeBlogDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<HomeBannerDTO>> GetBanners() {
            try
            {
                var resultEntity = _bannerRepository.Queryable().Take(12).ToList();
                var data = _mapper.Map<List<Banner>, List<HomeBannerDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeBannerDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeBannerDTO>>(true, null, MessageConstants.Error);
            }
        }
    }
}
