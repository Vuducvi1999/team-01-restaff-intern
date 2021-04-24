﻿using AutoMapper;
using BE.Controllers;
using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Categories;
using Domain.DTOs.Products;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Categories;
using Service.Files;
using Service.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseCategoryFeUser)]
    [ApiController]
    public class CategoryFeUserController : BaseController
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Category> _repositoryCategory;
        private readonly IRepository<Product> _repositoryProduct;

        private readonly IMapper _mapper;

        public CategoryFeUserController(ICategoryService categoryService, IAuthService authService, IUserManager userManager, IFileService fileService, IProductService productService, IUnitOfWork unitOfWork, IRepository<Product> repositoryProduct, IRepository<Category> repositoryCategory, IMapper mapper) : base(authService, userManager, fileService)
        {
            _categoryService = categoryService;
            _productService = productService;
            _unitOfWork = unitOfWork;
            _repositoryProduct = repositoryProduct;
            _repositoryCategory = repositoryCategory;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SerachPaginationDTO<CategoryDTO> serachPagination)
        {
            //List<Category> categoryDTOs = new List<Category>();
            //List<Product> productDTOs = new List<Product>();
            //List<String> urls = new List<string>() { "013245c3-9b09-454e-98cd-8d7ba8e90df1.jpeg", "04030102-efb1-4fe6-822a-29ddb0005fa3.jpg", "050b16ce-c52a-443b-a241-8865a93e04e3.jpg" };

            //for (int i = 0; i < 10; i++)
            //{
            //    categoryDTOs.Add(new Category()
            //    {
            //        Description = "Description" + i,
            //        ImageUrl = urls[new Random().Next(0, 3)],
            //        Name = "Category" + i,
            //    });
            //}

            //_unitOfWork.BeginTransaction();
            //_repositoryCategory.InsertRange(categoryDTOs);
            //_unitOfWork.Commit();
            //_unitOfWork.SaveChanges();

            //for (int i = 0; i < 100; i++)
            //{
            //    productDTOs.Add(new Product()
            //    {
            //        Description = "Description" + i,
            //        ImageUrl = urls[new Random().Next(0, 3)],
            //        Name = "Product" + i,
            //        CategoryId = categoryDTOs[new Random().Next(0, 10)].Id,
            //        Price = new Random().Next(1, 99) * 50000,
            //    });
            //}

            //_unitOfWork.BeginTransaction();
            //_repositoryProduct.InsertRange(productDTOs);
            //_unitOfWork.Commit();
            //_unitOfWork.SaveChanges();

            var result = _categoryService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }
    }
}
