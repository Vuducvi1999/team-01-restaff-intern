import { bind } from "mousetrap";

export class CommonShare {}

export enum ETypePositionInformation {
  BOX_1_4 = "product-detail", //left
  BOX_2 = "product-detail text-center",
  BOX_3_5 = "product-info",
}

export enum ETypePositionCart {
  BOX_1_3 = "cart-info cart-wrap", //right
  BOX_2 = "cart-box",
  BOX_4 = "cart-info",
  BOX_5 = "cart-detail",
}

export enum ETypeSizeImage {
  SMALL = "height: 160px; width: 112.5px;",
  NORMAL = "height: 260px; width: 180px;",
  MEDIUM = "height: 360px; width: 255px;",
  LARGE = "height: 560px; width: 400px;",
}

export enum ETypeGridLayout {
  VERYSMALL = "col-lg-12",
  SMALL = "col-lg-2",
  NORMAL = "col-lg-3",
  MEDIUM = "col-lg-4",
  LARGE = "col-lg-6",
}

export enum ETypeLayoutView {
  GRIDVIEW = "grid-view",
  LISTVIEW = "list-view",
}

export enum TypeDisplayImage {
  BLOG_IMAGE,
  PRODUCT_IMAGE,
  BLOG_DETAIL,
  PRODUCT_DETAIL_IMAGE,
  PRODUCT_DETAIL_MAIN_IMAGE
}

export const TemplateType = {
  Display: {
    [TypeDisplayImage.BLOG_IMAGE]: "blogImage classic-effect",
    [TypeDisplayImage.PRODUCT_IMAGE]: "productImage",
    [TypeDisplayImage.BLOG_DETAIL]: "blog-detail",
    [TypeDisplayImage.PRODUCT_DETAIL_IMAGE]: "product-details",
    [TypeDisplayImage.PRODUCT_DETAIL_MAIN_IMAGE]: "product-details-main"
  },
};
