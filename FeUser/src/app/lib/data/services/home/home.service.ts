import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ProductModel } from "../../models/products/product.model";

@Injectable()
export class HomeService {
  private url = "/api/home";
  public Currency = { name: "Dollar", currency: "USD", price: 1 }; // Default Currency

  constructor(private httpClient: HttpClientService) {}

  getTopCollectionProducts(request: any = null) {
    const url = this.url + "/top-collection";
    return this.httpClient.getObservable(url, request).toPromise();
  }
  getNewProducts(request: any = null) {
    const url = this.url + "/new-products";
    return this.httpClient.getObservable(url, request).toPromise();
  }
  getBestSellerProducts(request: any = null) {
    const url = this.url + "/best-seller";
    return this.httpClient.getObservable(url, request).toPromise();
  }
  getFeaturedProducts(request: any = null) {
    const url = this.url + "/featured-products";
    return this.httpClient.getObservable(url, request).toPromise();
  }
  getOnSaleProducts(request: any = null) {
    const url = this.url + "/on-sale";
    return this.httpClient.getObservable(url, request).toPromise();
  }
}
