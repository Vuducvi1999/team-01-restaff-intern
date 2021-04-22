import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
import { HomeProductModel } from 'src/app/lib/data/models/home/product.model';
import { AppConfig } from 'src/app/lib/environments/config/appConfig';
import { HomeService } from 'src/app/lib/data/services/home/home.service';

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product: HomeProductModel;
  @Input() currency: any = this.homeService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc: string

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    if (this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
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

}
