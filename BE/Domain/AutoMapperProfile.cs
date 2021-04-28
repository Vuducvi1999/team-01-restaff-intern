using AutoMapper;
using Domain.DTOs.Categories;
using Domain.DTOs.Banners;
using Domain.DTOs.SocialMedias;
using Domain.DTOs.Files;
using Domain.DTOs.Suppliers;
using Domain.DTOs.User;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Domain.DTOs.Coupons;
using Domain.DTOs.Profiles;
using Domain.DTOs.Users;
using Domain.DTOs.Products;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Domain.DTOs.Blogs;
using Domain.DTOs.Orders;
using Domain.DTOs.ProductsFeUser;
using Domain.DTOs.Home;
using Domain.DTOs.OrderDetails;
using Domain.DTOs.InfomationWeb;

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

            // Users
            CreateMap<PaginatedList<User>, PaginatedList<UserDTO>>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UpdateProfileDTO>().ReverseMap();
            CreateMap<User, CreateUserDTO>().ReverseMap(); CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, ChangePassworProfileDTO>().ReverseMap();
            CreateMap<User, UserDataReturnDTO>().ReverseMap();

            // Files
            CreateMap<PaginatedList<File>, PaginatedList<FileDTO>>().ReverseMap();
            CreateMap<File, FileDTO>().ReverseMap();
            CreateMap<File, CreateFileDTO>().ReverseMap();
            CreateMap<File, UpdateFileDTO>().ReverseMap();
            CreateMap<File, DeleteFileDTO>().ReverseMap();
            //CreateMap<CreateFileDTO, SaveFileDTO>().ReverseMap();
            CreateMap<SaveFileDTO, CreateFileDTO>();



            //product
            CreateMap<PaginatedList<Product>, PaginatedList<ProductDTO>>().ReverseMap();
            CreateMap<Product, ProductDTO>()
                 .ForMember(t => t.CategoryName, k=>k.MapFrom(h=>h.Category.Name)).ReverseMap();

            CreateMap<CreateProductDTO, Product>().ReverseMap();
            CreateMap<UpdateProductDTO, Product>().ReverseMap();
            CreateMap<IQueryable<ProductDTO>, PaginatedList<Product>>().ReverseMap();
            CreateMap<Product, ProductDTOFeUser>().ReverseMap();


            //Coupon
            CreateMap<PaginatedList<Coupon>, PaginatedList<CouponDTO>>().ReverseMap();
            CreateMap<Coupon, CouponDTO>().ReverseMap();
            CreateMap<Coupon, CreateCouponDTO>().ReverseMap();
            CreateMap<Coupon, UpdateCouponDTO>().ReverseMap();
            CreateMap<Coupon, DeleteCouponDTO>().ReverseMap();

            //Blog
            CreateMap<PaginatedList<Blog>, PaginatedList<BlogDTO>>().ReverseMap();
            CreateMap<Blog, BlogDTO>().ReverseMap();
            CreateMap<Blog, CreateBlogDTO>().ReverseMap();
            CreateMap<Blog, UpdateBlogDTO>().ReverseMap();
            CreateMap<Blog, DeleteBlogDTO>().ReverseMap();

            //Order
            CreateMap<PaginatedList<Order>, PaginatedList<OrderDTO>>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Order, CreateOrderDTO>().ReverseMap();
            CreateMap<Order, UpdateOrderDTO>().ReverseMap();
            CreateMap<Order, DeleteOrderDTO>().ReverseMap();

            //OrderDetail
            CreateMap<OrderDetail, OrderDetailDTO>()
                .ForMember(t=>t.ProductName, k=>k.MapFrom(h=>h.Product == null ? "" : h.Product.Name))
                .ForMember(t => t.ProductImgUrl, k => k.MapFrom(h => h.Product == null ? "" : h.Product.ImageUrl))
                 .ReverseMap();
            CreateMap<OrderDetail, CreateOrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, UpdateOrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, DeleteOrderDetailDTO>().ReverseMap();

            //homePage FeUser
            CreateMap<Product, HomeProductDTO>()
                 .ForMember(t => t.CategoryName, k => k.MapFrom(h => h.Category.Name)).ReverseMap();
            CreateMap<Blog, HomeBlogDTO>().ReverseMap();
            CreateMap<Banner, HomeBannerDTO>().ReverseMap();



            //Information Web
            CreateMap<InformationWebsite, InformationWebDTO>().ReverseMap();
            CreateMap<InformationWebsite, UpdateInformationWebDTO>().ReverseMap();
        }
    }
}
