import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client';
import { SocialMediaModel } from '../../models/social-medias/social-media.model';

@Injectable()
export class SocialMediaService {
  private url = '/api/social-media';

  constructor(private httpClient: HttpClientService) {}

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  create(model: FormData) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  update(model: FormData) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

  delete(model: SocialMediaModel) {
    const url = `${this.url}/?id=${model?.id}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }
}
