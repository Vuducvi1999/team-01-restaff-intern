import { HttpClientService } from "src/app/lib/http/http-client";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FooterService {
  private url = "/api/footer";
  private urlInfo = "/api/info-website";
  constructor(private httpClient: HttpClientService) {}

  getCategories(request: any) {
    return this.httpClient
      .getObservable(this.url + "/categories", request)
      .toPromise();
  }

  getSocialMedias(request: any) {
    return this.httpClient
      .getObservable(this.url + "/social-medias", request)
      .toPromise();
  }

  getInformationWeb(request: any) {
    return this.httpClient.getObservable(this.urlInfo, request).toPromise();
  }
}
