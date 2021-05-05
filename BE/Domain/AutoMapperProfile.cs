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
using Domain.DTOs.Customer;
using Domain.DTOs.ProductsFeUser;
using Domain.DTOs.Home;
using Infrastructure.Extensions;
using Domain.DTOs.PageContent;
using Domain.DTOs.InfomationWeb;
using Domain.DTOs.PageContentContact;
using Domain.DTOs.Contact;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Comments;

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
            CreateMap<User, CreateUserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
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
                 .ForMember(t => t.CategoryName, k => k.MapFrom(h => h.Category.Name)).ReverseMap();

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
            CreateMap<PaginatedList<OrderDetail>, PaginatedList<OrderDetailDTO>>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailDTO>()
                .ForMember(t => t.ProductName, k => k.MapFrom(h => h.Product == null ? "" : h.Product.Name))
                .ForMember(t => t.ProductImgUrl, k => k.MapFrom(h => h.Product == null ? "" : h.Product.ImageUrl))
                 .ReverseMap();
            CreateMap<OrderDetail, CreateOrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, UpdateOrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, DeleteOrderDetailDTO>().ReverseMap();
            //Customer
            CreateMap<PaginatedList<User>, PaginatedList<CustomerDTO>>().ReverseMap();
            CreateMap<User, CustomerDTO>()
                .ForMember(a => a.FirstName, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.FirstName : c.Customer.FirstName))
                .ForMember(a => a.LastName, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.LastName : c.Customer.LastName))
                .ForMember(a => a.Address, b => b.MapFrom(c => c.Customer.Address))
                .ForMember(a => a.Email, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.Email : c.Customer.Email))
                .ForMember(a => a.Phone, b => b.MapFrom(c => c.Customer.Phone))
                .ForMember(a => a.Id, b => b.MapFrom(c => c.Customer.Id))

                .ReverseMap();
            CreateMap<User, CreateCustomerDTO>().ReverseMap();
            CreateMap<User, UpdateCustomerDTO>().ReverseMap();
            CreateMap<User, DeleteCustomerDTO>().ReverseMap();

            CreateMap<Customer, CustomerDTO>().ReverseMap();
            CreateMap<Customer, CreateCustomerDTO>().ReverseMap();
            CreateMap<Customer, UpdateCustomerDTO>().ReverseMap();
            CreateMap<Customer, DeleteCustomerDTO>().ReverseMap();

            CreateMap<User, CustomerDataReturnDTO>()
               .ForMember(a => a.FirstName, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.FirstName : c.Customer.FirstName))
               .ForMember(a => a.LastName, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.LastName : c.Customer.LastName))
               .ForMember(a => a.Address, b => b.MapFrom(c => c.Customer.Address))
               .ForMember(a => a.Email, b => b.MapFrom(c => c.Customer.IsNullOrEmpty() ? c.Email : c.Customer.Email))
               .ForMember(a => a.Phone, b => b.MapFrom(c => c.Customer.Phone))
               .ForMember(a => a.CustomerId, b => b.MapFrom(c => c.Customer.Id))
               .ReverseMap();
            CreateMap<CustomerRegisterDTO, CreateCustomerDTO>().ReverseMap();
            CreateMap<CustomerDTO, CustomerDataReturnDTO>().ReverseMap();

            //homePage FeUser
            CreateMap<Product, HomeProductDTO>()
                 .ForMember(t => t.CategoryName, k => k.MapFrom(h => h.Category.Name)).ReverseMap();
            CreateMap<Blog, HomeBlogDTO>().ReverseMap();

            CreateMap<Banner, HomeBannerDTO>().ReverseMap();

            // PageContent
            CreateMap<PageContent, PageContentDTO>().ReverseMap();
            CreateMap<PageContent, UpdatePageContentDTO>().ReverseMap();

            // Page Content Contact
            CreateMap<Contact, ContactDTO>().ReverseMap();
            CreateMap<Contact, CreateContactDTO>().ReverseMap();

            //Information Web
            CreateMap<InformationWebsite, InformationWebDTO>().ReverseMap();
            CreateMap<InformationWebsite, UpdateInformationWebDTO>().ReverseMap();

            // Comment
            CreateMap<Comment, CreateCommentDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<PaginatedList<Comment>, PaginatedList<CommentDTO>>().ReverseMap();

            //RatingProduct
            CreateMap<ProductRating, ProductRatingDTO>()
                .ReverseMap();
            CreateMap<ProductRating, UpdateProductRatingDTO>().ReverseMap();
            CreateMap<ProductRating, CreateProductRatingDTO>().ReverseMap();
        }
    }
}
