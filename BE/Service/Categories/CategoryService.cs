using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Linq;
using Common.StringEx;
namespace Service.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _productRepository = productRepository;
        }


        //public bool CleanString(UpdateCategoryDTO model)
        //{
        //    var stringItems = model.GetType().GetProperties()
        //            .Where(p => p.PropertyType == typeof(string));
        //    foreach (var stringItem in stringItems)
        //    {
        //        if (stringItem.GetValue(model).ToString() == ""
        //            || stringItem.GetValue(model).ToString().Trim() == ""
        //            || stringItem.GetValue(model).ToString().EndsWith("")
        //            || stringItem.GetValue(model).ToString().StartsWith(""))
        //        {
        //            return false;
        //        }
        //        var currentItem = stringItem.GetValue(model).ToString().Trim();
        //    }
        //    return true;
        //}

        public ReturnMessage<CategoryDTO> Create(CreateCategoryDTO model)
        {
            var stringInput = StringExtension.CleanString(model);
            if (!stringInput)
            {
                return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
            }
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
                //if (!CleanString(entity))
                //{
                //    return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
                //}
               
                var products = _productRepository.Queryable().Where(r => r.CategoryId == model.Id);

                if (entity.IsNotNullOrEmpty())
                {
                    foreach (var product in products)
                    {
                        product.Delete();
                        product.IsDeleted = true;
                        _productRepository.Update(product);
                    }
                    entity.Delete();
                    entity.IsDeleted = true;
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
            resultEntity.Results.Where(r => r.ObjectState == ObjectState.Added);
            var data = _mapper.Map<PaginatedList<Category>, PaginatedList<CategoryDTO>>(resultEntity);
            
            var result = new ReturnMessage<PaginatedList<CategoryDTO>>(false, data, MessageConstants.UpdateSuccess);

            return result;
        }
    

        public ReturnMessage<CategoryDTO> Update(UpdateCategoryDTO model)
        {
            var stringInput = StringExtension.CleanString(model);
            if (!stringInput)
            {
                return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
            }
            try
            {
                var entity = _categoryRepository.Find(model.Id);
                //if (!CleanString(entity))
                //{
                //    return new ReturnMessage<CategoryDTO>(true, null, MessageConstants.Error);
                //}
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
