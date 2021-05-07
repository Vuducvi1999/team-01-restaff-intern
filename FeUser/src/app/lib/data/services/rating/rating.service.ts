import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";

@Injectable()
export class RatingService {
  private url = "/api/rating";

  constructor(private httpClient: HttpClientService) {}

  create(request: any) {
    return this.httpClient.postObservable(this.url, request).toPromise();
  }

  update(request: any) {
    return this.httpClient.putObservable(this.url, request).toPromise();
  }

  save(model: any) {
    if (model.id) {
      return this.update(model);
    }
    return this.create(model);
  }

  get(id: any) {
    return this.httpClient.getObservable(this.url, id).toPromise();
  }
}
