import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, FileService } from "src/app/lib/data/services";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { CustomerWishListService } from "src/app/lib/data/services/customerWishLists/customerWishList.service";
import { UserDataReturnDTOModel, UserModel } from "src/app/lib/data/models/users/user.model";
import { TypeDisplayImage } from "src/app/shared/data";
import { DeleteCustomerWishListModel } from "src/app/lib/data/models/customerWishList/customerWishList.model";
import { CartService } from "src/app/lib/data/services/cart/cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
  providers: [CustomerWishListService, CartService, AuthService],
})
export class WishlistComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  typeDisplayImage = TypeDisplayImage;

  userInfo: UserDataReturnDTOModel;
  subDataUser: Subscription;

  constructor(
    private wishListService: CustomerWishListService,
    public cartService: CartService,
    private authService: AuthService,
  ) {}
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
  }

  ngOnInit(): void {
    this.subDataUser = this.authService.callUserInfo.subscribe(it => {
      this.userInfo = it;
      this.getList();
    });
    // this.getList();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getList() {
    this.wishListService
      .getByCustomer(this.userInfo.id)
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data;
      });
  }

  removeItem(product: any) {
    // this.cartService.removeWishlistItem(product);

    const model: DeleteCustomerWishListModel = {
      productId: product.id,
      customerId: this.userInfo.id,
    };
    this.wishListService.delete(model).then(() => this.getList());
  }

  getImage(image: string) {
    return FileService.getLinkFile(image);
  }

  checkStock(product: ProductModel) {
    const cart = JSON.parse(localStorage.getItem("cartItems"));
    const cartItems: ProductModel[] =
      cart?.cartDetails ?? [];

    return cartItems.some((i) => product.id == i.id);
  }
}
