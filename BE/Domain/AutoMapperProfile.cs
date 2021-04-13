using AutoMapper;
using Domain.DTOs.Suppliers;
using Domain.DTOs.User;
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
            CreateMap<User, UserDataReturnDTO>().ReverseMap();
        }
    }
}
