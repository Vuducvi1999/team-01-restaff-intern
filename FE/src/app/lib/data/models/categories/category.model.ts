import { BaseModel } from "../common";
import { baseDTO } from "./baseDTO.model";

export interface CategoryModel extends BaseModel, baseDTO{
  name: string;
  description: string;
  imageUrl: string;
}
