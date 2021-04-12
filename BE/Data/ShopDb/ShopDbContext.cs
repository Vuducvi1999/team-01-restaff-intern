using Domain.Entities;
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
        DbSet<Category> Categories { get; set; }
    }
}
