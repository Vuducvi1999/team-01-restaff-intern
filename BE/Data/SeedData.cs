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
                }
                if(!await ctx.Categories.AnyAsync() && !await ctx.Products.AnyAsync())
                {
                    var categories = new List<Category>();
                    for(int i = 0; i < 10; i++)
                    {
                        categories.Add(new Category()
                        {
                            Name = "Category" + i,
                            Description = "Hello kitty..."
                        });
                    }
                    ctx.Categories.AddRange(categories);

                    for(int i = 0; i < 100; i++)
                    {

                    }

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
                        ctx.InformationWebsites.Add(new InformationWebsite() {
                        Id = CommonConstants.WebSiteInformationId,
                        Address = "123 Hai Ba Trung",
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
