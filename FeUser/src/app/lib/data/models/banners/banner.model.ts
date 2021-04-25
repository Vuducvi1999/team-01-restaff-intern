import { BaseModel } from "../common";
export interface BannerModel extends BaseModel {
  title: string;
  description: string;
  link:string;
  imageURL:string;
  displayOrder:number;
}
