import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { FileService } from 'src/app/lib/data/services';
import { ProductModel } from 'src/app/lib/data/models';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [CartService]
})
export class SettingsComponent implements OnInit {

  public products: ProductModel[] = [];
  public search: boolean = false;

  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public cartService: CartService,
    public route:Router) {
    this.cartService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }


  searchToggle() {

    this.search = !this.search;
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.cartService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  getLink(name:any){
    const url = `/product-details?name=${name}`;
    this.route.navigateByUrl(url);
  }
}
