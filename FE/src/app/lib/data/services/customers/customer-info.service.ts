import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client';
import { CustomerInfoModel, CustomerModel } from '../../models';
import { UserModel } from '../../models/users/user.model';

@Injectable()
export class CustomerInfoService {
  private url = '/api/customer/info';

  constructor(private httpClient: HttpClientService) { }

  get(request: any) {
    return this.httpClient.getObservable(this.url, request).toPromise();
  }

  create(model: CustomerInfoModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  update(model: CustomerInfoModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

  delete(model: CustomerInfoModel) {
    const url = `${this.url}/?id=${model?.id}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }

  save(model) {
    if (model.id) {
      return this.update(model);
    }
    return this.create(model);
  }
}
