import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/lib/data/models';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CartService]

})
export class CheckoutComponent implements OnInit {
  public products: ProductModel[] = [];
  public totalPrice: any;
  public bannersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(response => this.products = response);
    this.calculateTotalPrice();
  }

  loadFormItem() {
    this.bannersForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      link: [''],
      imageURL: ['', Validators.required],
      displayOrder: [
        '',
        Validators.required,
      ],
    });
  }
  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((accumulator, product) => (accumulator + product.price * product.quantity), 0);
  }
}
