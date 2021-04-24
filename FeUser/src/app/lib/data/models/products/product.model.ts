import { BaseModel } from "../common";

export interface ProductModel extends BaseModel{
    name: string,
    description: string,
    imageUrl: string,
    contentHTML: string,
    displayOrder: number,
    categoryId: number,
    categoryName: string,
    price: number,
    isImportant: boolean,
    quantity?: number,
}

export enum ETypeSort {
    NULL,
    AZ,
    ZA,
    PRICELOW,
    PRICEHIGH,
}