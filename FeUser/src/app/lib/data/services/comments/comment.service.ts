import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { SearchPaganationDTO } from "../../models";
import {
  CommentModel,
  SearchCommentModel,
} from "../../models/comments/comment.model";

@Injectable()
export class CommentService {
  private url = "/api/comment";

  constructor(private httpClient: HttpClientService) {}

  getBlogComments(search: SearchPaganationDTO<SearchCommentModel> = null) {
    const qs = Object.keys(search.search)
      .map(
        (key) =>
          `search.${encodeURIComponent(key)}=${encodeURIComponent(
            search.search[key]
          )}`
      )
      .join("&");
    const qs2 = Object.keys({
      pageIndex: search.pageIndex,
      pageSize: search.pageSize,
    })
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
      .join("&");

    const url = this.url + `/blog?${qs}&${qs2}`;
    return this.httpClient.getObservable(url).toPromise();
  }

  getProductComments(search: SearchPaganationDTO<SearchCommentModel> = null) {
    const url = this.url + `/product`;
    return this.httpClient.getObservable(url).toPromise();
  }

  create(model: CommentModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }
}
