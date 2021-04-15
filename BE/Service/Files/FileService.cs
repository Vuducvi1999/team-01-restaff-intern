using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Files;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Files
{
    public class FileService : IFileService
    {
        private readonly IRepository<Domain.Entities.File> _fileRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FileService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<Domain.Entities.File> fileRepository)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _fileRepository = fileRepository;
        }

        public ReturnMessage<List<FileDTO>> Create(List<CreateFileDTO> model)
        {
            if (model.IsNullOrEmpty())
            {
                return new ReturnMessage<List<FileDTO>>(true, null, MessageConstants.Error);
            }

            try
            {
                _unitOfWork.BeginTransaction();
                var entities = _mapper.Map<List<CreateFileDTO>, List<Domain.Entities.File>>(model);
                _fileRepository.InsertRange(entities);
                _unitOfWork.Commit();
                var result = new ReturnMessage<List<FileDTO>>(false, _mapper.Map<List<Domain.Entities.File>, List<FileDTO>>(entities), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<List<FileDTO>>(true, null, ex.Message);
            }

        }

        public ReturnMessage<List<FileDTO>> Delete(List<DeleteFileDTO> model)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<PaginatedList<FileDTO>> SearchPagination(SerachPaginationDTO<FileDTO> search)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<List<FileDTO>> Update(List<UpdateFileDTO> model)
        {
            throw new NotImplementedException();
        }
    }
}
