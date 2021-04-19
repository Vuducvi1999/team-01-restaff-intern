using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.EntityFramework.Factories;
using Microsoft.Extensions.DependencyInjection;
using Service.SocialMedias;
using Service.Categories;
using Service.Banners;
using Service.Auth;
using Service.Suppliers;
using Service.Coupons;
using Service.Profiles;
using Service.Users;
using Service.Products;

namespace Service
{
    public static class ConfigureDi
    {
        public static void Setup(IServiceCollection services)
        {
            services.AddScoped<RepositoryFactories>();
            services.AddScoped<IRepositoryProvider, RepositoryProvider>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUnitOfWorkAsync, UnitOfWork>();
            services.AddScoped(typeof(IRepositoryAsync<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            services.AddScoped<ICouponService, CouponService>();
            //scoped
            services.AddScoped<ISocialMediaService, SocialMediaService>();
            services.AddScoped<IAuthService, AuthService>();
            //scoped
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IBannerService, BannerService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<IUserService, UserService>();
        }
    }
}
