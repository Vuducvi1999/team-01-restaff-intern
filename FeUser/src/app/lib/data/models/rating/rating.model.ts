import { BaseModel } from "../common";

export interface RatingModel extends BaseModel {
  rating: number;
  customerId: string;
  productId: string;
}
