import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../shared/services/product.service";
import { FileService } from "src/app/lib/data/services";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { CustomerWishListService } from "src/app/lib/data/services/customerWishLists/customerWishList.service";
import { UserModel } from "src/app/lib/data/models/users/user.model";
import { TypeDisplayImage } from "src/app/shared/data";
import {
  CustomerWishListModel,
  DeleteCustomerWishListModel,
} from "src/app/lib/data/models/customerWishList/customerWishList.model";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
  providers: [CustomerWishListService],
})
export class WishlistComponent implements OnInit {
  products: ProductModel[] = [];
  typeDisplayImage = TypeDisplayImage;

  constructor(
    private router: Router,
    private wishListService: CustomerWishListService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if (status) {
      this.router.navigate(["/shop/cart"]);
      this.removeItem(product);
    }
  }

  getList() {
    const user: UserModel = JSON.parse(localStorage.getItem("user"));
    this.wishListService
      .getByCustomer(user.id)
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data;
        console.log("wishlist:", data.data);
      });
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);

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
    const cartItems: ProductModel[] = JSON.parse(
      localStorage.getItem("cartItems")
    );

    return cartItems.some((i) => product.id == i.id);
  }
}
