import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";


@Injectable()
export class ProductDetailsService  {

    constructor(private httpClient: HttpClientService) { }

    private url = '/api/user/product-details';

    get(model: string) {
        const url = `${this.url}?id=${model}`;
      return this.httpClient.getObservable(url).toPromise();
    }
  }