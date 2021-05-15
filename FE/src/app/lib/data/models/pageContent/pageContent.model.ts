import { BaseModel } from '../common';
export interface PageContentModel extends BaseModel {
  title: string;
  shortDes: string;
  description: string;
  imageUrl: string;
  files: FileDtoModel[];
}
