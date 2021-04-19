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


            //Coupon
            CreateMap<PaginatedList<Coupon>, PaginatedList<CouponDTO>>().ReverseMap();
            CreateMap<Coupon, CouponDTO>().ReverseMap();
            CreateMap<Coupon, UpdateProfileDTO>().ReverseMap();
            CreateMap<Coupon, CreateCouponDTO>().ReverseMap();

        }
    }
}
