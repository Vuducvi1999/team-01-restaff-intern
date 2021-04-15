using AutoMapper;
using Domain.DTOs.Categories;
using Domain.DTOs.Banners;
using Domain.DTOs.SocialMedias;
using Domain.DTOs.Suppliers;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Domain.DTOs.Products;

namespace Domain
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //supplier
            CreateMap<PaginatedList<Supplier>, PaginatedList<SupplierDTO>>().ReverseMap();
            CreateMap<Supplier, SupplierDTO>().ReverseMap();
            CreateMap<CreateSupplierDTO, Supplier>().ReverseMap();

            //category
            CreateMap<PaginatedList<Category>, PaginatedList<CategoryDTO>>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CreateCategoryDTO, Category>().ReverseMap();

            //social media
            CreateMap<PaginatedList<SocialMedia>, PaginatedList<SocialMediaDTO>>().ReverseMap();
            CreateMap<SocialMedia, SocialMediaDTO>().ReverseMap();
            CreateMap<CreateSocialMediaDTO, SocialMedia>().ReverseMap();

            //banner
            CreateMap<PaginatedList<Banner>, PaginatedList<BannerDTO>>().ReverseMap();
            CreateMap<Banner, BannerDTO>().ReverseMap();
            CreateMap<CreateBannerDTO, Banner>().ReverseMap();


            //product
            CreateMap<PaginatedList<Product>, PaginatedList<ProductDTO>>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<CreateProductDTO, Product>().ReverseMap();

        }
    }
}
