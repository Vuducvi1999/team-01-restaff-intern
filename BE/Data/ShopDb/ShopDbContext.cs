﻿using Domain.Entities;
using Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ShopDbContext : DataContext
    {
        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options)
        {
        }

        DbSet<Supplier> Suppliers { get; set; }
        DbSet<SocialMedia> SocialMedias { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Coupon> Coupons { get; set; }
        DbSet<Banner> Banners { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<File> Files { get; set; }
        DbSet<Blog> Blogs { get; set; }
        DbSet<Order> Order { get; set; }
        DbSet<OrderDetail> OrderDetail { get; set; }




    }
}
