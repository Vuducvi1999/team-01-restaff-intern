using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Extension
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DataSeedWebsite>().HasData(
                new DataSeedWebsite {Id = Guid.NewGuid(),
                    Address = "Fashion 62 Tran Huy Lieu, Ward 12, Phu Nhuan, Ho Chi Minh, Viet Nam",
                    Email = "fashion62@gmail.com",
                    Fax = "62626262626262",
                    Phone = "6262626262",
                    Logo = "Logo" }
                );
        }
    }
}
