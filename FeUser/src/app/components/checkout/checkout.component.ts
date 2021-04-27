import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailModel, OrderModel, ProductModel } from 'src/app/lib/data/models';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CartService, OrdersService]

})
export class CheckoutComponent implements OnInit {
  public products: ProductModel[] = [];
  public totalPrice: any;
  public totalItem: any;

  public order: OrderModel = new OrderModel();
  constructor(
    public cartService: CartService,
    public orderService: OrdersService,
    public routerService: Router) {
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
    this.calculateTotalItem();
  }

  loadCartItems() {
    this.cartService.cartItems.subscribe(response => this.products = response);
  }
  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((accumulator, product) => (accumulator + product.price * product.quantity), 0);
  }

  calculateTotalItem() {
    this.totalItem = this.products.reduce((accumulator, product) => (accumulator + product.quantity), 0);
  }

  onSubmit() {
    this.loadModel();
    this.orderService.create(this.order).then(
      (resp) => {
        localStorage.removeItem('cartItems');
        this.routerService.navigate(["checkout/success"],{state: resp})
      }
    ).catch((er) => console.log(er));

  }

  loadModel() {
    this.order.fullName = `${this.order.firstName} ${this.order.lastName}`;
    this.order.totalAmount = this.totalPrice;
    this.order.totalItem = this.totalItem;
    this.products.forEach(product => {
      var orderDetail = new OrderDetailModel();
      orderDetail.productId = product.id;
      orderDetail.productName = product.name;
      orderDetail.price = product.price;
      orderDetail.quantity = product.quantity;
      orderDetail.totalAmount = orderDetail.price * orderDetail.quantity;
      this.order.orderDetails.push(orderDetail);
    });
  }
}
