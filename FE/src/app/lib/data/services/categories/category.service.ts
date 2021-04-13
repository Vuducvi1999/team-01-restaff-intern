import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/lib/environments/config/appConfig";
import { HttpClientService } from "src/app/lib/http/http-client";
import { CategoryModel } from "../../models/categories/category.model";

@Injectable()
export class CategoriesService  {

    private url = '/api/category';

    constructor(private httpClient: HttpClientService) { }

    get(request: any) {
      return this.httpClient.getObservable(this.url, request).toPromise();
    }

    create(model: FormData) {
      return this.httpClient.postObservable(this.url, model).toPromise();
    }

    update(model: FormData) {
      return this.httpClient.putObservable(this.url, model).toPromise();
    }

    delete(model: CategoryModel) {
      const url = `${this.url}/?Id=${model?.id}`;
      return this.httpClient.deleteObservable(url).toPromise();
    }
  }
