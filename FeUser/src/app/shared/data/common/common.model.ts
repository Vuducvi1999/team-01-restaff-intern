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
  HOME_PRODUCT_IMAGE,
  BLOG_DETAIL,
  LOGO_IMAGE,
  WISHLIST_IMAGE,
  SETTING_IMAGE,
}

export const TemplateType = {
  Display: {
    [TypeDisplayImage.BLOG_IMAGE]: "blogImage",
    [TypeDisplayImage.HOME_PRODUCT_IMAGE]: "home-product-image",
    [TypeDisplayImage.BLOG_DETAIL]: "blog-detail",
    [TypeDisplayImage.LOGO_IMAGE]: "logo-image",
    [TypeDisplayImage.WISHLIST_IMAGE]: "wish-list-image",
    [TypeDisplayImage.SETTING_IMAGE]: "setting-image",
  },
};
