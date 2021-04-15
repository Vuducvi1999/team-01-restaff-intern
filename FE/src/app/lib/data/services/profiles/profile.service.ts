import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { BannerModel } from "../../models/banners/banner.model";


@Injectable()
export class ProfileService {

  private url = '/api/profile';

  constructor(private httpClient: HttpClientService) { }

  get(request: any) {
    return  this.httpClient.getObservable(this.url, request).toPromise();
  }
  update(model: BannerModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }
}

