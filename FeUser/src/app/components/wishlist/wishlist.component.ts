import { Component, OnInit } from "@angular/core";
import { FileService, MessageService } from "src/app/lib/data/services";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { CustomerWishListService } from "src/app/lib/data/services/customerWishLists/customerWishList.service";
import { UserModel } from "src/app/lib/data/models/users/user.model";
import { TypeDisplayImage } from "src/app/shared/data";
import { CartService } from "src/app/lib/data/services/cart/cart.service";
import { SaveCustomerWishListModel } from "src/app/lib/data/models/customerWishList/customerWishList.model";

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
    public cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getList() {
    this.wishListService
      .getByCustomer()
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data;
      });
  }

  removeItem(product: any) {
    this.messageService
      .confirm("Do you want to remove?", "Yes", "No", false)
      .then((confirm) => {
        if (confirm.isConfirmed) {
          this.cartService.removeWishlistItem(product);
          const model: SaveCustomerWishListModel = {
            productId: product.id,
          };
          this.wishListService.createOrDelete(model).then(() => this.getList());
        }
      });
  }

  getImage(image: string) {
    return FileService.getLinkFile(image);
  }

  checkStock(product: ProductModel) {
    const cartItems: ProductModel[] =
      JSON.parse(localStorage.getItem("cartItems"))?.cartDetails ?? [];

    return cartItems.some((i) => product.id == i.id);
  }
}
