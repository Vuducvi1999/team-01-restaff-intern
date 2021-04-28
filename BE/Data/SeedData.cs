using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

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
