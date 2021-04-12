using Common.Http;

namespace Service.Common
{
    public interface ICommonCRUDService<TRespone, CreateT, UpdateT, DeleteT> where TRespone : class
    {
        ReturnMessage<TRespone> Create(CreateT model);
        ReturnMessage<TRespone> Update(UpdateT model);
        ReturnMessage<TRespone> Delete(DeleteT model);
    }
}
