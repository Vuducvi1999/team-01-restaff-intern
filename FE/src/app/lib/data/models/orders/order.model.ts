import { BaseModel } from "../common";
// import { FileDtoModel } from "../files/file.model";
export interface OrderModel extends BaseModel {
  fullName:string;
  code:string;
  address:string;
  phone:string;
  email:string;
  status:string;
  totalAmount:number;
  totalItem:number;
}
