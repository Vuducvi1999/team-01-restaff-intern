using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Banners;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;

namespace Service.Banners
{
    public class BannerService : IBannerService
    {
        private readonly IRepository<Banner> _bannerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BannerService(IRepository<Banner> bannerRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _bannerRepository = bannerRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<BannerDTO> Create(CreateBannerDTO model)
        {
            try
            {

                var entity = _mapper.Map<CreateBannerDTO, Banner>(model);

                entity.Insert();
                _bannerRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<BannerDTO>(false, _mapper.Map<Banner, BannerDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BannerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<BannerDTO> Delete(DeleteBannerDTO model)
        {
            try
            {
                var entity = _bannerRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _bannerRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<BannerDTO>(false, _mapper.Map<Banner, BannerDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<BannerDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BannerDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<BannerDTO> Update(UpdateBannerDTO model)
        {
            try
            {
                var entity = _bannerRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _bannerRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<BannerDTO>(false, _mapper.Map<Banner, BannerDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<BannerDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<BannerDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<PaginatedList<BannerDTO>> SearchPagination(SerachPaginationDTO<BannerDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<BannerDTO>>(false, null, MessageConstants.DeleteSuccess);
            }

            var resultEntity = _bannerRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Title.Contains(search.Search.Title) ||
                        it.Description.Contains(search.Search.Description)
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.Title
            );
            var data = _mapper.Map<PaginatedList<Banner>, PaginatedList<BannerDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<BannerDTO>>(false, data, MessageConstants.DeleteSuccess);

            return result;
        }


    }
}

