import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { RatingModel } from "../../models/rating/rating.model";

@Injectable()
export class RatingService {
  private url = "/api/rating";

  constructor(private httpClient: HttpClientService) {}

  create(request: RatingModel) {
    return this.httpClient.postObservable(this.url, request).toPromise();
  }

  update(request: RatingModel) {
    return this.httpClient.putObservable(this.url, request).toPromise();
  }

  save(model: RatingModel) {
    if (model.id) {
      return this.update(model);
    }
    return this.create(model);
  }

  get(productId: any) {
    return this.httpClient.getObservable(this.url, productId).toPromise();
  }

  getPoint(productId: any) {
    const urlPoint = this.url + "/point";
    return this.httpClient.getObservable(urlPoint, productId).toPromise();
  }
}
