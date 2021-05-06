using Domain.Constants;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Common.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Data
{
    public static class SeedData
    {
        public static async Task InitSysData(this ShopDbContext ctx)
        {
            try
            {
                if (ctx == null)
                    throw new ArgumentNullException(nameof(ctx));
                if (!await ctx.Users.AnyAsync())
                {
                    ctx.Users.Add(new Domain.Entities.User()
                    {
                        Username = "admin",
                        Password = "E10ADC3949BA59ABBE56E057F20F883E",
                    });
                    ctx.SaveChanges();
                }
                if (!await ctx.PageContents.AnyAsync())
                {
                    foreach (var item in PageContentConstants.ListPageContents)
                    {
                        item.Value.ObjectState = ObjectState.Added;
                        item.Value.Id = item.Key;
                        ctx.PageContents.Add(item.Value);
                        ctx.SaveChanges();
                    }
                }
                if (!await ctx.InformationWebsites.AnyAsync())
                {
                    ctx.InformationWebsites.Add(new InformationWebsite()
                    {
                        Id = CommonConstants.WebSiteInformationId,
                        Address = "67 Tran Huy Lieu",
                        Email = "email@gmail.com",
                        Fax = "656565655656",
                        Logo = "logo1",
                        Phone = "776767776767",
                        CreateByDate = DateTime.Now,
                        IsActive = true,
                        ObjectState = Infrastructure.EntityFramework.ObjectState.Added
                    });
                    ctx.SaveChanges();
                }
                if (!await ctx.Categories.AnyAsync())
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        ctx.Categories.Add(new Category()
                        {
                            Name = "Category " + i,
                            Description = "Description for Category " + i,
                            ImageUrl = "https://res.cloudinary.com/tungimage/image/upload/v1620233950/pyv3241siykegow7phjf.jpg",
                            CreateByDate = DateTime.Now,
                            IsActive = true,
                            ObjectState = Infrastructure.EntityFramework.ObjectState.Added
                        });
                        ctx.SaveChanges();
                    }

                    
                }
                if (!await ctx.Products.AnyAsync())
                {
                    for (int i = 1; i <= 50; i++)
                    {
                        ctx.Products.Add(new Product()
                        {
                            Name = "Product " + i,
                            Description = "Description for Product " + i,
                            ContentHTML = "Content for Product " + i,
                            CategoryId = ctx.Categories.Select(r => r.Id).First(),
                            Price = 1000000,
                            DisplayOrder = 1,
                            IsImportant = false,
                            IsDeleted = false,
                            CreateByDate = DateTime.Now,
                            IsActive = true,
                            HasDisplayHomePage = false,
                            ImageUrl = "https://res.cloudinary.com/tungimage/image/upload/v1620230565/x1kv8vatwdtebbjnzkdv.jpg,https://res.cloudinary.com/tungimage/image/upload/v1620233950/pyv3241siykegow7phjf.jpg",
                            ObjectState = Infrastructure.EntityFramework.ObjectState.Added
                        });
                        ctx.SaveChanges();
                    }
                }

            }
            catch (Exception ex)
            {
                var error = ex.Message;
            }
        }

        public static async void Run(IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ShopDbContext>();
                    if (context != null)
                    {
                        await context.InitSysData();
                    }
                }
                catch (Exception ex)
                {
                    throw;

                }
            }
        }
    }
}
