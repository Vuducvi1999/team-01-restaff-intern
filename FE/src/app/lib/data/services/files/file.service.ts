import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";

@Injectable()
export class FileService  {

    private url = '/api/file';
    private urlDownload = this.url + '/download';
    private urlGetType = this.url +'/type';

    constructor(private httpClient: HttpClientService) { }

    getFile(request: any) {
      return this.httpClient.getObservable(this.url, request).toPromise();
    }

    getType()
    {
        return this.httpClient.getObservable(this.urlGetType).toPromise();
    }

    saveFile(model: FormData) {
      return this.httpClient.postObservable(this.url, model).toPromise();
    }

    downloadFile(url: string) {
      return this.httpClient.postObservable(this.urlDownload, url).toPromise();
    }
  }
