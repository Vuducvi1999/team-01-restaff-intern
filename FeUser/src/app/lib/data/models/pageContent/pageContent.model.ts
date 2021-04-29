import { BaseModel } from "../common";

export interface PageContentModel extends BaseModel {
  title: string;
  order: number;
  shortDes: string;
  description: string;
}
export interface UpdatePageContentModel {
  id: string;
  title: string;
  shortDes: string;
  description: string;
}
