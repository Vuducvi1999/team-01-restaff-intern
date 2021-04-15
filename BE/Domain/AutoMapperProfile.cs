using AutoMapper;
using Domain.DTOs.Categories;
using Domain.DTOs.Banners;
using Domain.DTOs.SocialMedias;
using Domain.DTOs.Suppliers;
using Domain.DTOs.User;
using Domain.Entities;
using Infrastructure.EntityFramework;

namespace Domain
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PaginatedList<Supplier>, PaginatedList<SupplierDTO>>().ReverseMap();
            CreateMap<Supplier, SupplierDTO>().ReverseMap();
            CreateMap<CreateSupplierDTO, Supplier>().ReverseMap();

            CreateMap<PaginatedList<Category>, PaginatedList<CategoryDTO>>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CreateCategoryDTO, Category>().ReverseMap();

            CreateMap<PaginatedList<SocialMedia>, PaginatedList<SocialMediaDTO>>().ReverseMap();
            CreateMap<SocialMedia, SocialMediaDTO>().ReverseMap();
            CreateMap<CreateSocialMediaDTO, SocialMedia>().ReverseMap();
            CreateMap<Supplier, CreateSupplierDTO>().ReverseMap();
            CreateMap<Supplier, DeleteSupplierDTO>().ReverseMap();
            CreateMap<Supplier, UpdateSupplierDTO>().ReverseMap();

            CreateMap<PaginatedList<Banner>, PaginatedList<BannerDTO>>().ReverseMap();
            CreateMap<Banner, BannerDTO>().ReverseMap();
            CreateMap<Banner, CreateBannerDTO>().ReverseMap();
            CreateMap<Banner, UpdateBannerDTO>().ReverseMap();
            CreateMap<Banner, DeleteBannerDTO>().ReverseMap();


            CreateMap<User, UpdateUserDTO>().ReverseMap();

            CreateMap<CreateBannerDTO, Banner>().ReverseMap();
        }
    }
}
