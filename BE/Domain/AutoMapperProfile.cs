using AutoMapper;
using Domain.DTOs.Categories;
using Domain.DTOs.Banners;
using Domain.DTOs.SocialMedias;
using Domain.DTOs.Suppliers;
using Domain.DTOs.User;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Domain.DTOs.Coupons;
using Domain.DTOs.Profiles;
using Domain.DTOs.Users;
using Domain.DTOs.Products;
using System.Linq;

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

            CreateMap<Supplier, CreateSupplierDTO>().ReverseMap();
            CreateMap<Supplier, DeleteSupplierDTO>().ReverseMap();
            CreateMap<Supplier, UpdateSupplierDTO>().ReverseMap();

            //banner
            CreateMap<PaginatedList<Banner>, PaginatedList<BannerDTO>>().ReverseMap();
            CreateMap<Banner, BannerDTO>().ReverseMap();
            CreateMap<Banner, CreateBannerDTO>().ReverseMap();
            CreateMap<Banner, UpdateBannerDTO>().ReverseMap();
            CreateMap<Banner, DeleteBannerDTO>().ReverseMap();


            CreateMap<User, UpdateProfileDTO>().ReverseMap();

            CreateMap<CreateBannerDTO, Banner>().ReverseMap();
            CreateMap<Banner, CreateBannerDTO>().ReverseMap();
            CreateMap<Banner, UpdateBannerDTO>().ReverseMap();
            CreateMap<Banner, DeleteBannerDTO>().ReverseMap();

            CreateMap<User, UserDataReturnDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, ChangePassworProfileDTO>().ReverseMap();
            CreateMap<User, UserDataReturnDTO>().ReverseMap();

            // Users
            CreateMap<PaginatedList<User>, PaginatedList<UserDTO>>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UpdateProfileDTO>().ReverseMap();
            CreateMap<User, CreateUserDTO>().ReverseMap();



            //product
            CreateMap<PaginatedList<Product>, PaginatedList<ProductDTO>>().ReverseMap();
            CreateMap<Product, ProductDTO>()
                 .ForMember(t => t.CategoryName, k=>k.MapFrom(h=>h.Category.Name)).ReverseMap();
            CreateMap<CreateProductDTO, Product>().ReverseMap();
            CreateMap<IQueryable<ProductDTO>, PaginatedList<Product>>().ReverseMap();

        }
    }
}
