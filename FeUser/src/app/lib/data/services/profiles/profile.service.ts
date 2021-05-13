import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ChangePasswordProfileModel, ProfileModel } from "../../models";

@Injectable()
export class ProfileService {
  private url = "/api/user/profile";
  private urlChangePassword = this.url + "/password";
  private urlCheckEmail = this.url + "/checkemail";
  private urlCheckPhone = this.url + "/checkphone";
  private urlCheckUserName = this.url + "/checkusername";

  constructor(private httpClient: HttpClientService) {}

  update(model: ProfileModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }
  changePassword(model: ChangePasswordProfileModel) {
    return this.httpClient
      .putObservable(this.urlChangePassword, model)
      .toPromise();
  }

  checkEmail(email: string) {
    return this.httpClient
      .getObservable(this.urlCheckEmail, {
        params: { email: email, loading: true },
        headers: { ignoreLoadingBar: '' },
      })
      .toPromise();
  }

  checkPhone(phone: string){
    return this.httpClient
      .getObservable(this.urlCheckPhone, {
        params: { phone: phone, loading: true },
        headers: { ignoreLoadingBar: '' },
      })
      .toPromise();
  }
}
