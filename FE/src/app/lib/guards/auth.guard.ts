import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { RouterHelperService } from '../helpers';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isEmpty } from 'rxjs/operators';
import { AuthService } from '../data/services';
import { ReturnMessage, UserDataReturnDTOModel } from '../data/models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsAdminService {
  constructor(
    private router: Router,
    private routerHelperService: RouterHelperService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if (token) {
      return this.authService
        .getInformationUser()
        .then((res: ReturnMessage<UserDataReturnDTOModel>) => {
          if (res.hasError) {
            return this.routerHelperService.redirectToLogin();
          }
          localStorage.setItem('user', JSON.stringify(res.data));
          route.data = {
            user: res.data,
            token: token,
          };
          const url: string = this.getStateUrl(route, state.url);
          return true;
        }).catch(er => {
          return this.routerHelperService.redirectToLogin();
        });
    }
    return this.routerHelperService.redirectToLogin();
    // route.data = {
    //   user: JSON.parse(localStorage.getItem('user')),
    //   token: localStorage.getItem('token'),
    // };
    // const user = route.data?.token;
    // if (user && Object.keys(user).length !== 0) {
    //   const url: string = this.getStateUrl(route, state.url);
    //   return true;
    // }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = route.data;
    if (user) {
      const url: string = this.getStateUrl(route, state.url);
      return true;
    }
    return this.canActivate(route, state);
  }

  getStateUrl(route: ActivatedRouteSnapshot, url: string) {
    const configPath = route.routeConfig.path;
    if (!configPath) {
      return configPath;
    }
    const pathConfig = route.routeConfig.path.split('/:');
    if (pathConfig.length) {
      const path = pathConfig[0];
      let index = url.indexOf(path);
      index += path.length;
      const finalUrl = url.substr(0, index);
      return finalUrl;
    }
  }

  canLoad(route: Route) {
    const url = `/${route.path}`;
  }
}
