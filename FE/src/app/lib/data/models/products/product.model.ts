import { baseDTO } from "../categories/baseDTO.model";
import { BaseModel } from "../common";

export interface ProductModel extends BaseModel, baseDTO{
    name: string,
    description: string,
    imageUrl: string,
    contentHTML: string,
    displayOrder: number,
    hasDisplayHomePage: boolean,
    categoryName: string[],
    price: number,
    isImportant: boolean
}