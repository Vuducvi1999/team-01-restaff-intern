import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AppConfig } from '../environments/config/appConfig';
import { of } from 'rxjs';
import { RouterHelperService } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {

  constructor(
    private http: HttpClient,
    private routerHelperService: RouterHelperService,
    private location: Location,
    private activeModal: NgbModal,
     @Inject('BASE_URL') private baseUrl: string
  ) { }

  handleError(err: any) {
    if (err) {
      if (err.status === 401) {

        this.activeModal.dismissAll();

        if (window.location.pathname === '/login') {
          return;
        }
        this.routerHelperService.redirectToLogin();
      } else if (err.status === 403) {

      }
    }
    return err;
  }

  getHeader(param?: any, isSetToken = true) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', AppConfig.settings.API_URL);
    if (param && param.headers) {
      // headers = param.headers;
      const listKeys = Object.keys(param.headers).map(key => {
        return { name: key, value: param.headers[key] };
      });
      listKeys.forEach(item => {
        headers = headers.append(item.name, item.value);
      });
    }
    const authToken = { token: "" };
    if (authToken && authToken.token && isSetToken) {
      headers = headers.append('Authorization', `Bearer ${authToken.token}` || '');
    }
    let httpOptions = { headers };
    if (param) {
      if (param.params) {
        const ignores = param.params!.ignores || [];
        let params = new HttpParams();
        const listKeys = Object.keys(param.params).map(key => {
          return { name: key, value: param.params[key] };
        });
        let queryParamsString = '';
        listKeys.forEach(item => {
          if (item.name !== 'isGenerate' && item.name !== 'ignores') {
            const check = ignores.find(x => x === item.name);
            if (item.value === null || item.value === undefined) {
              item.value = '';
            }
            params = params.append(item.name, item.value);
            if (item.value !== undefined && item.value !== null && !check) {
              if (queryParamsString !== '') {
                queryParamsString += '&';
              }
              queryParamsString += item.name + '=' + encodeURIComponent(item.value);
            }
          }
        });
        httpOptions = { ...httpOptions, ...{ params } };
        if (param.params.isGenerate) {
          this.location.replaceState(window.location.pathname + '?' + queryParamsString);
        }
      }
      if (param.options) {
        httpOptions = { ...httpOptions, ...param.options };
      }
      if (environment.iswithCredentials) {
        // tslint:disable-next-line: no-string-literal
        httpOptions['withCredentials'] = true;
      }
    }
    return httpOptions;
  }

  setUserInfo(data: any, isPost = true) {
    if (data) {
      // const authToken = SecurityHelper.getStoreAuthen();
      // if (authToken && authToken.user) {
      //   data.userId = authToken.user.id;
      //   if (isPost) {
      //     data.createdBy = authToken.user.id;
      //   } else {
      //     data.updateBy = authToken.user.id;
      //   }
      // }
    }
  }

  getSync(url: any, params?: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(params);
      this.http.get(url, { ...options, withCredentials: true }).subscribe(
        (res: any) => {

          if (res && res.data && res.roles) {
            res = res.data;
          }
          resolve(res);
        },
        error => {
          if (environment.production) {
            this.handleError(error);
          } else {
            reject(this.handleError(error));
          }
        },
      );
    });
  }

  deleteSync(url: any, params?: any): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.http.delete(url, this.getHeader(params)).subscribe(
        (res: any) => {
          resolve(res);
        },
        error => {
          if (environment.production) {
            this.handleError(error);
          } else {
            reject(this.handleError(error));
          }
        },
      );
    });
  }

  postSync(url: string, data?: any, params: any = {}, isOption = false): Promise<any | undefined> {
    if (!isOption) {
      this.setUserInfo(params);
    }
    return new Promise((resolve, reject) => {
      this.http.post(url, data, this.getHeader(params)).subscribe(
        (res: any) => {

          resolve(res);
        },
        error => {
          if (environment.production) {
            this.handleError(error);
          } else {
            reject(this.handleError(error));
          }
        },
      );
    });
  }

  async putSync(url: string, data?: any, params?: any, isOption = false): Promise<any | undefined> {
    if (!isOption) {
      this.setUserInfo(params);
    }
    return new Promise((resolve, reject) => {
      this.http.put(url, data, this.getHeader(params)).subscribe(
        (res: any) => {
          resolve(res);
        },
        error => {
          if (environment.production) {
            this.handleError(error);
          } else {
            reject(this.handleError(error));
          }
        },
      );
    });
  }

  get(url: any, params?: any) {
    return this.http.get(url, this.getHeader(params)).toPromise();
  }

  delete(url: any, params?: any) {
    return this.http.delete(url, this.getHeader(params)).toPromise();
  }

  post(url: string, data?: any, params: any = {}) {
    this.setUserInfo(params);
    return this.http.post(url, data, this.getHeader(params)).toPromise();
  }

  put(url: string, data?: any, params: any = {}) {
    this.setUserInfo(params);
    return this.http.put(url, data, this.getHeader(params)).toPromise();
  }

  getObservable(apiUrl: string, params: any = {}, isLoading = true) {
    const url = this.getFullUrl(apiUrl);
    let httpOptions = this.getHeader({ params });
    httpOptions = this.getLoadingHeader(isLoading, httpOptions);

    return this.http.get(url, httpOptions).pipe(
      switchMap(m => this.mappingDataResponse(m)),
      catchError((response: HttpErrorResponse) => {
        this.handleErrorObservable(response);
        throw response;
      })
    );
  }

  postObservable(apiUrl: string, request: any = {}, isLoading = true) {
    const url = this.getFullUrl(apiUrl);
    let httpOptions = this.getHeader();
    httpOptions = this.getLoadingHeader(isLoading, httpOptions);

    return this.http.post(url, request, httpOptions).pipe(
      switchMap(m => this.mappingDataResponse(m)),
      catchError((response: HttpErrorResponse) => {
        this.handleErrorObservable(response);
        throw response;
      })
    );
  }

  putObservable(apiUrl: string, request: any, isLoading = true) {
    const url = this.getFullUrl(apiUrl);
    let httpOptions = this.getHeader();
    httpOptions = this.getLoadingHeader(isLoading, httpOptions);

    return this.http.put(url, request, httpOptions).pipe(
      switchMap(m => this.mappingDataResponse(m)),
      catchError((response: HttpErrorResponse) => {
        this.handleErrorObservable(response);
        throw response;
      })
    );
  }

  deleteObservable(apiUrl: string, isLoading = true) {
    const url = this.getFullUrl(apiUrl);
    let httpOptions = this.getHeader();
    httpOptions = this.getLoadingHeader(isLoading, httpOptions);

    return this.http.delete(url, httpOptions).pipe(
      switchMap(m => this.mappingDataResponse(m)),
      catchError((response: HttpErrorResponse) => {
        this.handleErrorObservable(response);
        throw response;
      })
    );
  }

  private getFullUrl(url: string) {
    return `${AppConfig.settings.API_URL}${url}`;
  }

  private getLoadingHeader(isLoading, httpOptions) {
    if (isLoading) {
      return httpOptions;
    }
    const newHeader = httpOptions.headers.append('IsLoading', 'false');
    httpOptions = {
      ...httpOptions,
      headers: newHeader
    };
    return httpOptions;
  }

  private handleErrorObservable(response: any) {
    if (response.status === 401) {

      this.activeModal.dismissAll();

      if (window.location.pathname === '/login') {
        return;
      }
      this.routerHelperService.redirectToLogin();
    } else if (response.status === 403) {
      // if (SecurityHelper.isLogin) {
      //   Toastr.warning('Please make sure you have right access');
      //   return;
      // }
    }
  }

  private mappingDataResponse(response: any) {
    if (response?.id < 0) {
      throw response;
    }
    return of(response);
  }
}
