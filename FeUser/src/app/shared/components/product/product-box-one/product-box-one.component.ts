import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { ProductService } from "../../../services/product.service";
import { ProductModel } from "src/app/lib/data/models";
import { FileService } from "src/app/lib/data/services";
import { HomeService } from "src/app/lib/data/services/home/home.service";

@Component({
  selector: "app-product-box-one",
  templateUrl: "./product-box-one.component.html",
  providers: [HomeService]
})
export class ProductBoxOneComponent implements OnInit {
  @Input() product: ProductModel;
  @Input() currency: any = this.productService.Currency; // Default Currency
  @Input() thumbnail: boolean = false; // Default False
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc: string;

  constructor(private productService: ProductService, private homeService: HomeService) { }

  ngOnInit(): void {
    if (this.loader) {
      setTimeout(() => {
        this.loader = false;
      }, 2000); // Skeleton Loader
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

  addToCart(product: any) {
    this.homeService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.homeService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.homeService.addToCompare(product);
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
