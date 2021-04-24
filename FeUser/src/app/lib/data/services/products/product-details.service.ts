import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ProductDetailsModel } from "../../models/products/product-details.model";
import { ProductModel } from "../../models/products/product.model";


@Injectable()
export class ProductDetailsService  {

    constructor(private httpClient: HttpClientService) { }

    private url = '/api/user/productdetails';

    get(model: string) {
        const url = `${this.url}?id=${model}`;
      return this.httpClient.getObservable(url).toPromise();
    }
  }