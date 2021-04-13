import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { BannerModel } from "../../models";

@Injectable()
export class BannersService {

  private url = '/api/banner';

  constructor(private httpClient: HttpClientService) { }

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  create(model: FormData) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  update(model: BannerModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

  delete(model: BannerModel) {
    const url = `${this.url}/${model?.id}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }
}

