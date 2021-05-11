import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/lib/data/models';
import { CartModel } from 'src/app/lib/data/models/cart/cart.model';
import { FileService } from 'src/app/lib/data/services';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';
import { ProductService } from 'src/app/lib/data/services/products/product.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService]
})
export class CartComponent implements OnInit, OnChanges {
  // public cartItems = JSON.parse(localStorage.getItem("cartItems"));
  public products: ProductModel[] = [];
  public cart: CartModel;
  constructor(public cartService: CartService, public productService: ProductService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.cartService.cartData.subscribe(cart => {   
         this.products = cart.cartDetails;
         this.cart = cart;
    });
  
  }
  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }

  adjustQuantity(product: any, number: any) {
    this.cartService.updateCartQuantity(product,number);
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
