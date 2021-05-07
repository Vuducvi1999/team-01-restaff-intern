import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailModel, OrderModel, ProductModel } from 'src/app/lib/data/models';
import { CartModel } from 'src/app/lib/data/models/cart/cart.model';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CartService, OrdersService, CouponService]

})
export class CheckoutComponent implements OnInit {
  public cart: CartModel;
  public products: ProductModel[] = [];
  public subTotal: any;
  public totalAmount: any;
  public totalItem: any;
  public couponValue: any;
  public order: OrderModel = new OrderModel();
  constructor(
    public cartService: CartService,
    public orderService: OrdersService,
    public couponService: CouponService,
    public routerService: Router) {
  }


  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.cartData.subscribe((cart: CartModel) => {
      this.products = cart.cartDetails;
      this.cart = cart;
      this.subTotal = cart.totalAmount;
    });
  }



  onSubmit() {
    this.loadModel();
    console.log(this.order)
    this.orderService.create(this.order).then(
      (resp) => {
        this.cartService.removeAll();
        this.routerService.navigate(["checkout/success"], { state: resp })
      }
    ).catch((er) => console.log(er));

  }

  loadModel() {
    this.order.fullName = `${this.order.firstName} ${this.order.lastName}`;
    this.order.totalAmount = this.totalAmount;
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

  applyCoupon() {
    this.couponService.getByCode(null, this.order.couponCode)
      .then((resp) => {
        this.order.couponId = resp.data.id;
        this.order.couponName = resp.data.name;
        if (resp.data.hasPercent) {
          this.order.couponPercent = resp.data.value;

          this.order.couponValue = this.subTotal * resp.data.value / 100;
          this.couponValue = this.order.couponValue;
          this.totalAmount = this.subTotal - this.couponValue;
          return this.order.totalAmount = this.totalAmount;
        }

          this.order.couponValue = resp.data.value;
          this.order.couponPercent = (resp.data.value/this.subTotal ) * 100;
          this.couponValue = this.order.couponValue;
          this.totalAmount = (this.cart.totalAmount - this.couponValue)<0? 0:(this.cart.totalAmount - this.couponValue) ;
          this.order.totalAmount = this.totalAmount;
      })
      .catch((er) => console.log(er));

  }
}
