import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/app/lib/data/models';
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
  public totalPrice: any;
  constructor(public cartService: CartService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(response => this.products = response);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((accumulator, product) => (accumulator + product.price * product.quantity), 0);
  }
  removeItem(product: any) {
    this.cartService.removeCartItem(product);
    this.calculateTotalPrice();
  }

  adjustQuantity(product: any, number: any) {
    product.quantity += number;
    if (product.quantity < 0) {
      product.quantity = 0;
    }
    localStorage.setItem('cartItems',JSON.stringify(this.products))
    this.calculateTotalPrice();
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
