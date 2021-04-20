import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client';

@Injectable()
export class HeaderService {
  private url = '/api/header';

  constructor(private httpClient: HttpClientService) { }


  getCategories(request: any) {
    return this.httpClient.getObservable(this.url+"/categories", request).toPromise();
  }
  getSocialMedias(request: any) {
    return this.httpClient.getObservable(this.url+"/social-medias", request).toPromise();
  }

}
