import { HttpClientService } from 'src/app/lib/http/http-client';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private url = '/api/header';
  private urlInfo = '/api/info-website';
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
  getHeader(request: any = null){
    return  this.httpClient.getObservable(this.url, request).toPromise();
  }
}
