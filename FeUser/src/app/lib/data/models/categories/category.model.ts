import { BaseModel } from "../common";
import { FileDtoModel } from "../files/file.model";
export interface CategoryModel extends BaseModel {
  name: string;
  description: string;
  imageUrl: string;
  //images: FileDtoModel[];
}
