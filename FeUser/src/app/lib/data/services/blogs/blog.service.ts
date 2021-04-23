import { Injectable } from "@angular/core";
import { HttpClientService } from "../../../http/http-client";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private url = "/api/blog";
  private top = this.url + "/topblog";
  private recent = this.url + "/recentblog";

  constructor(private httpClient: HttpClientService) {}

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  getTop(request: any) {
    return this.httpClient.getObservable(this.top, request).toPromise();
  }
}
