import { BaseModel } from "../common";

export interface HomeProductModel extends BaseModel {
  name: string;
  description: string;
  imageUrl: string;
  contentHTML: string;
  displayOrder: number;
  categoryId: number;
  price: number;
  isImportant: boolean;
  categoryName: string;
  hasDisplayHomePage: boolean;
}

export interface HomeBlogModel extends BaseModel {
  title: string;
  shortDes: string;
  contentHTML: string;
  imageUrl: string;
}