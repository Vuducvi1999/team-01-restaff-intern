using AutoMapper;
using Domain.DTOs.Categories;
using Domain.DTOs.Banners;
using Domain.DTOs.Suppliers;
using Domain.Entities;
using Infrastructure.EntityFramework;

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
        }
    }
}
