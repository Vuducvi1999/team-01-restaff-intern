export class OrderModel {
  id?: string;
  fullName?: string;
  firstName? = '';
  lastName? = '';
  address = '';
  phone = '';
  email = '';
  status: 'New';
  totalAmount = 0;
  totalItem = 0;
  orderDetails?: OrderDetailModel[] = [];
}

export class OrderDetailModel {
  // orderId:string;
  productName = '';
  productId = '';
  price = 0;
  quantity = 0;
  totalAmount = 0;
}
