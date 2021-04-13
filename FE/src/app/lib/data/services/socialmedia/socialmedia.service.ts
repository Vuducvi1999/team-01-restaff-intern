import { HttpClientService } from 'src/app/lib/http/http-client';
import { SocialMediaModel } from '../../models/socialmedias/socialmedia.model';

class SocialMediaService {
  private url = '/api/socialmedia';

  constructor(private httpClient: HttpClientService) {}

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  create(model: SocialMediaModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  update(model: SocialMediaModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

  delete(model: SocialMediaModel) {
    const url = `${this.url}/${model?.id}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }
}
