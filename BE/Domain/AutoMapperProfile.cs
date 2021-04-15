using AutoMapper;
using Domain.DTOs.Banners;
using Domain.DTOs.Files;
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
            CreateMap<Supplier, CreateSupplierDTO>().ReverseMap();
            CreateMap<Supplier, DeleteSupplierDTO>().ReverseMap();
            CreateMap<Supplier, UpdateSupplierDTO>().ReverseMap();

            CreateMap<PaginatedList<Banner>, PaginatedList<BannerDTO>>().ReverseMap();
            CreateMap<Banner, BannerDTO>().ReverseMap();
            CreateMap<Banner, CreateBannerDTO>().ReverseMap();
            CreateMap<Banner, UpdateBannerDTO>().ReverseMap();
            CreateMap<Banner, DeleteBannerDTO>().ReverseMap();

            CreateMap<User, UserDataReturnDTO>().ReverseMap();

            CreateMap<PaginatedList<File>, PaginatedList<FileDTO>>().ReverseMap();
            CreateMap<File, FileDTO>().ReverseMap();
            CreateMap<File, CreateFileDTO>().ReverseMap();
            CreateMap<File, UpdateFileDTO>().ReverseMap();
            CreateMap<File, DeleteFileDTO>().ReverseMap();
        }
    }
}
