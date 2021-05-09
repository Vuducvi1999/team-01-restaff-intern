import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/lib/data/models';
import { CartModel } from 'src/app/lib/data/models/cart/cart.model';
import { FileService } from 'src/app/lib/data/services';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';

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
  constructor(public cartService: CartService) {
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
