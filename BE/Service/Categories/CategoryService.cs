using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;


namespace Service.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IRepository<Category> categoryRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CategoryDTO> Create(CreateCategoryDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateCategoryDTO, Category>(model);
                entity.Insert();
                _categoryRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CategoryDTO>(false, _mapper.Map<Category, CategoryDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CategoryDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CategoryDTO> Delete(DeleteCategoryDTO model)
        {
            try
            {
                var entity = _categoryRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _categoryRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CategoryDTO>(false, _mapper.Map<Category, CategoryDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CategoryDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CategoryDTO>> SearchPagination(SerachPaginationDTO <CategoryDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CategoryDTO>>(false, null, MessageConstants.DeleteSuccess);
            }

            var resultEntity = _categoryRepository.GetPaginatedList(it => search.Search == null ||
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
            var data = _mapper.Map<PaginatedList<Category>, PaginatedList<CategoryDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CategoryDTO>>(false, data, MessageConstants.DeleteSuccess);

            return result;
        }
    

        public ReturnMessage<CategoryDTO> Update(UpdateCategoryDTO model)
        {
            try
            {
                var entity = _categoryRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _categoryRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CategoryDTO>(false, _mapper.Map<Category, CategoryDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CategoryDTO>(true, null, ex.Message);
            }
        }
    }
}
