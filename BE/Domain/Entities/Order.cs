using Domain.DTOs.Orders;

namespace Domain.Entities
{
    public class Order : BaseEntity

    {
        public string FullName { get; set; }
        public string Code { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public int TotalAmount { get; set; }
        public int TotalItem { get; set; }




        public override void Insert()
        {
            base.Insert();
        }
        public override void Delete()
        {
            base.Delete();
        }

        public void Update(UpdateOrderDTO model)
        {
            base.Update();
            FullName = model.FullName;
            Code = model.Code;
            Address = model.Address;
            Phone = model.Phone;
            Email = model.Email;
            Status = model.Status;
            TotalAmount = model.TotalAmount;
            TotalItem = model.TotalItem;

            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }

}
