import { BaseModel } from "../common";
import { baseDTO } from "../common/baseDTO.model";

export interface ProductDetailsModel extends BaseModel, baseDTO{
    name: string,
    description: string,
    imageUrl: string,
    contentHTML: string,
    displayOrder: number,
    categoryId: number,
    categoryName: string,
    price: number,
    isImportant: boolean
}