import { BaseModel } from "../common";

export interface ProductModel extends BaseModel{
    name: string,
    description: string,
    imageUrl: string,
    contentHTML: string,
    displayOrder: number,
    hasDisplayHomePage: boolean,
    categoryId: number,
    categoryName: [],
    price: number,
    isImportant: boolean

}