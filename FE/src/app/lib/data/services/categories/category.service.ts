import { AppConfig } from "src/app/lib/environments/config/appConfig";
import { HttpClientService } from "src/app/lib/http/http-client";
import { CategoryModel } from "../../models/categories/category.model";

export class CategoriesService  {

    private url = '/api/category';

    constructor(private httpClient: HttpClientService) { }

    get(request: any) {
      return this.httpClient.getObservable(this.url, request).toPromise();
    }

    create(model: CategoryModel) {
      return this.httpClient.postObservable(this.url, model).toPromise();
    }

    update(model: CategoryModel) {
      return this.httpClient.putObservable(this.url, model).toPromise();
    }

    delete(model: CategoryModel) {
      const url = `${this.url}/${model?.id}`;
      return this.httpClient.deleteObservable(url).toPromise();
    }
  }
