import { BaseModel } from "../common";

export interface ProductModel extends BaseModel{
    name: string,
    description: string,
    imageUrl: string,
    contentHTML: string,
    displayOrder: number,
    categoryId: number,
    price: number,
    isImportant: boolean

}