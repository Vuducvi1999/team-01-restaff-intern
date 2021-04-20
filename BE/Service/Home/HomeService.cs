using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.Home;
using Domain.Entities;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Home
{
    public class HomeService : IHomeService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public HomeService(IRepository<Product> productRepository,IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }


        public ReturnMessage<List<HomeProductDTO>> GetTopCollectionProducts()
        {
            try
            {
                var resultEntity = _productRepository.Queryable().Take(16).ToList();
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
                var resultEntity = _productRepository.Queryable().ToList();
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
                var resultEntity = _productRepository.Queryable().ToList();
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
                var resultEntity = _productRepository.Queryable().ToList();
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
                var resultEntity = _productRepository.Queryable().ToList();
                var data = _mapper.Map<List<Product>, List<HomeProductDTO>>(resultEntity);
                var result = new ReturnMessage<List<HomeProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<HomeProductDTO>>(true, null, MessageConstants.Error);
            }
        }
    }
}
