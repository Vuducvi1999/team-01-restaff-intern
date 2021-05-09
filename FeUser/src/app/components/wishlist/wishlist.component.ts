import { Component, OnInit } from "@angular/core";
import { FileService } from "src/app/lib/data/services";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { CustomerWishListService } from "src/app/lib/data/services/customerWishLists/customerWishList.service";
import { UserModel } from "src/app/lib/data/models/users/user.model";
import { TypeDisplayImage } from "src/app/shared/data";
import { DeleteCustomerWishListModel } from "src/app/lib/data/models/customerWishList/customerWishList.model";
import { CartService } from "src/app/lib/data/services/cart/cart.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
  providers: [CustomerWishListService, CartService],
})
export class WishlistComponent implements OnInit {
  products: ProductModel[] = [];
  typeDisplayImage = TypeDisplayImage;

  constructor(
    private wishListService: CustomerWishListService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getList() {
    const user: UserModel = JSON.parse(localStorage.getItem("user"));
    this.wishListService
      .getByCustomer(user.id)
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data;
      });
  }

  removeItem(product: any) {
    // this.cartService.removeWishlistItem(product);

    const user: UserModel = JSON.parse(localStorage.getItem("user"));
    const model: DeleteCustomerWishListModel = {
      productId: product.id,
      customerId: user.id,
    };
    this.wishListService.delete(model).then(() => this.getList());
  }

  getImage(image: string) {
    return FileService.getLinkFile(image);
  }

  checkStock(product: ProductModel) {
    const cartItems: ProductModel[] =
      JSON.parse(localStorage.getItem("cartItems")) ?? [];

    return cartItems.some((i) => product.id == i.id);
  }
}
