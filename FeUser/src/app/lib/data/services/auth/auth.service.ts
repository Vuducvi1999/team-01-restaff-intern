import { Injectable } from "@angular/core";
import { environment } from "src/app/lib/environments/environment";
import { HttpClientService } from "src/app/lib/http/http-client";
import { AuthLoginModel, AuthRegistModel, ReturnMessage } from "../../models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClientService) {}

  private url = "/api/user/auth";
  private urlLogin = this.url + "/login";
  private urlRegiter = this.url + "/regist";

  ngOnInit(): void {}

  login(body: AuthLoginModel) {
    return this.http.postObservable(this.urlLogin, body).toPromise();
  }

  register(body: AuthRegistModel)
  {
    return this.http.postObservable(this.urlRegiter, body).toPromise();
  }

  getInformationUser()
  {
    return this.http.getObservable(this.url).toPromise();
  }
}
