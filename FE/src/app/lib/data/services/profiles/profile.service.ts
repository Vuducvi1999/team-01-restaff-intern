import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ChangePasswordProfileModel, ProfileModel, UserDataReturnDTOModel } from "../../models";


@Injectable()
export class ProfileService {

  private url = '/api/profile';

  constructor(private httpClient: HttpClientService) { }

  update(model: ProfileModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }
  changePassword(model: ChangePasswordProfileModel) {
    return this.httpClient.putObservable(this.url + "/password", model).toPromise();
  }
}

