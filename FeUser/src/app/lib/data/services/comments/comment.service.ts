import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { CommentModel } from "../../models/comments/comment.model";

@Injectable()
export class CommentService {
  private url = "/api/comment";

  constructor(private httpClient: HttpClientService) {}

  getAll() {
    return this.httpClient.getObservable(this.url).toPromise();
  }

  create(model: CommentModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }
}
