import { BaseModel } from "../common";

export interface CustomerWishListModel extends BaseModel {
  customerId: string;
  productId: string;
}

export interface CreateCustomerWishListModel {
  customerId: string;
  productId: string;
}

export interface DeleteCustomerWishListModel {
  customerId: string;
  productId: string;
}
