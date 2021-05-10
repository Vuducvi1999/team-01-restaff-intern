import { Injectable } from '@angular/core';
import { environment } from 'src/app/lib/environments/environment';
import { HttpClientService } from 'src/app/lib/http/http-client';
import { AuthLoginModel, ReturnMessage } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClientService) {}

  private url = '/api/auth';

  ngOnInit(): void {}

  login(body: AuthLoginModel) {
    return this.http.postObservable(`${this.url}/login`, body).toPromise();
  }

  getInformationUser() {
    return this.http.getObservable(this.url).toPromise();
  }
}
