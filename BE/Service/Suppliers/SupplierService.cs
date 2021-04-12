using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Paganation;
using Domain.DTOs.Suppliers;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;

namespace Service.Suppliers
{
    public class SupplierService : ISupplierService
    {
        private readonly IRepository<Supplier> _supplierRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SupplierService(IRepository<Supplier> supplierRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _supplierRepository = supplierRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<SupplierDTO> Create(CreateSupplierDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateSupplierDTO, Supplier>(model);
                entity.Insert();
                _supplierRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<SupplierDTO>(false, _mapper.Map<Supplier, SupplierDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<SupplierDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<SupplierDTO> Delete(DeleteSupplierDTO model)
        {
            try
            {
                var entity = _supplierRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _supplierRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<SupplierDTO>(false, _mapper.Map<Supplier, SupplierDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<SupplierDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<SupplierDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<SupplierDTO> Update(UpdateSupplierDTO model)
        {
            try
            {
                var entity = _supplierRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _supplierRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<SupplierDTO>(false, _mapper.Map<Supplier, SupplierDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<SupplierDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<SupplierDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<PaginatedList<SupplierDTO>> SearchPagination(SerachPaganationDTO<SupplierDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<SupplierDTO>>(false, null, MessageConstants.DeleteSuccess);
            }

            var resultEntity = _supplierRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Name.Contains(search.Search.Name) ||
                        it.Description.Contains(search.Search.Description)
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.Name
            );
            var data = _mapper.Map<PaginatedList<Supplier>, PaginatedList<SupplierDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<SupplierDTO>>(false, data, MessageConstants.DeleteSuccess);

            return result;
        }


    }
}
