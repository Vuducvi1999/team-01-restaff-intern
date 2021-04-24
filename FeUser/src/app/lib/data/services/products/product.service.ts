import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ProductModel } from "../../models/products/product.model";


@Injectable()
export class ProductService  {

    private url = '/api/user/product';

    constructor(private httpClient: HttpClientService) { }

    get(request: any) {
      return this.httpClient.getObservable(this.url, request).toPromise();
    }

    getByCategory(id:any,request: any) {
      return this.httpClient.getObservable(this.url+"/category?id="+id, request).toPromise();
    }

  }
