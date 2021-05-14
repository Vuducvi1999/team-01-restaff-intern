import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductModel, ReturnMessage } from "src/app/lib/data/models";
import { SaveCustomerWishListModel } from "src/app/lib/data/models/customerWishList/customerWishList.model";
import {
  UserDataReturnDTOModel,
  UserModel,
} from "src/app/lib/data/models/users/user.model";
import { CustomerWishListService } from "src/app/lib/data/services/customerWishLists/customerWishList.service";
import {
  ETypeGridLayout,
  ETypePositionCart,
  ETypePositionInformation,
  ETypeSizeImage,
  TypeDisplayImage,
} from "src/app/shared/data";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";

import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ThrowStmt } from "@angular/compiler";
import { CartService } from "src/app/lib/data/services/cart/cart.service";
import { FileService } from "src/app/lib/data/services/files/file.service";
import { Subscription } from "rxjs";
import { AuthService, SweetalertService } from "src/app/lib/data/services";
import Swal from "sweetalert2";
registerLocaleData(localeFr, "fr");

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
  styleUrls: ["./product-box.component.scss"],
  providers: [CartService, CustomerWishListService, AuthService],
})
export class ProductBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: ProductModel;
  @Input() currency: any = "VND"; // Default Currency
  @Input() thumbnail: boolean = false; // Default False
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  @Input() typePositionInformation: string = ETypePositionInformation.BOX_3_5;
  @Input() typePositionCart: string = ETypePositionCart.BOX_2;
  @Input() typeSizeImage: string = ETypeSizeImage.NORMAL;
  @Input() typeGridLayout: string = ETypeGridLayout.NORMAL;
  testData: ProductModel[];
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc: string;
  typeDisplayImage = TypeDisplayImage;

  userInfo: UserDataReturnDTOModel;
  subDataUser: Subscription;

  constructor(
    private cartService: CartService,
    private wishListService: CustomerWishListService,
    private authService: AuthService,
    private sweetService: SweetalertService
  ) {}
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
    this.subDataUser = null;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateTypeGridLayout();
  }

  ngOnInit(): void {
    if (this.loader) {
      setTimeout(() => {
        this.loader = false;
      }, 2000); // Skeleton Loader
    }
    this.subDataUser = this.authService.callUserInfo.subscribe((it) => {
      this.userInfo = it;
      this.getWishlist();
    });
  }

  getWishlist() {
    if (this.userInfo) {
      this.wishListService.getByCustomer(this.userInfo?.id).then((data) => {
        this.testData = data.data;
      });
    }
  }

  updateTypeGridLayout() {
    if (this.typeGridLayout == ETypeGridLayout.VERYSMALL) {
      //ListViewLayout
      this.typeSizeImage = ETypeSizeImage.NORMAL;
    }

    if (this.typeGridLayout == ETypeGridLayout.SMALL) {
      this.typeSizeImage = ETypeSizeImage.SMALL;
    }

    if (this.typeGridLayout == ETypeGridLayout.NORMAL) {
      this.typeSizeImage = ETypeSizeImage.NORMAL;
    }

    if (this.typeGridLayout == ETypeGridLayout.MEDIUM) {
      this.typeSizeImage = ETypeSizeImage.MEDIUM;
    }

    if (this.typeGridLayout == ETypeGridLayout.LARGE) {
      this.typeSizeImage = ETypeSizeImage.LARGE;
    }
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color);
      }
    }
    return uniqColor;
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        });
      }
    });
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: any) {
    const model: SaveCustomerWishListModel = {
      productId: product.id,
    };
    if (this.product.isInWishList) {
      return this.sweetService
        .confirm("Remove in wish list?", "Remove")
        .then((result) => {
          if (result.isConfirmed) {
            this.wishListService.createOrDelete(model).then(() => {
              this.product.isInWishList = false;
              this.cartService.removeWishlistItem(product);
            });
          }
        });
    }
    this.wishListService.createOrDelete(model).then(() => {
      this.product.isInWishList = true;
      this.cartService.addToWishlist(product);
    });
  }

  addToCompare(product: any) {
    this.cartService.addToCompare(product);
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
