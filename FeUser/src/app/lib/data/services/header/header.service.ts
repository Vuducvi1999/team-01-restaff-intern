import { HttpClientService } from 'src/app/lib/http/http-client';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderModel, Menu } from 'src/app/lib/data/models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private url = '/api/header';
  public screenWidth: any;
  public leftMenuToggle: boolean = false;
  public mainMenuToggle: boolean = false;

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
  constructor(private httpClient: HttpClientService) {
  }
   getCategories(request: any) {
    return  this.httpClient.getObservable(this.url + "/categories", request).toPromise();
  }
   getBlogs(request: any) {
    return  this.httpClient.getObservable(this.url + "/blogs", request).toPromise();
  }
}
