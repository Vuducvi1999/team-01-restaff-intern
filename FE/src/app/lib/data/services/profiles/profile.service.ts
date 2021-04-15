import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import { ProfileModel } from "../../models";


@Injectable()
export class ProfileService {

  private url = '/api/profile';

  constructor(private httpClient: HttpClientService) { }

  update(model: ProfileModel) {
    return this.httpClient.putObservable(this.url, model).toPromise();
  }

}

