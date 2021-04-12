import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { RouterHelperService } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsAdminService {
  constructor(private router: Router, private routerHelperService: RouterHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Constants.previousUrl = route;
    const user = route.data;
    if (user) {
      const url: string = this.getStateUrl(route, state.url);
      return true;
    }
    return this.canActivate(route, state);
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
