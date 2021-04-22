import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { CategoryModel } from "../../models/categories/category.model";

@Injectable()
export class CategoryService  {

    private url = '/api/user/category';

    constructor(private httpClient: HttpClientService) { }

    get(request: any) {
      return this.httpClient.getObservable(this.url, request).toPromise();
    }
  }
