import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client';
import { UserModel } from '../../models/users/user.model';

@Injectable()
export class UserService {
  private url = '/api/user';

  constructor(private httpClient: HttpClientService) {}

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  create(model: UserModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  update(model: UserModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

  delete(model: UserModel) {
    const url = `${this.url}/?id=${model?.id}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }
}
