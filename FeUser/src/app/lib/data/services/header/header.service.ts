import { HttpClientService } from 'src/app/lib/http/http-client';
import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderModel, Menu } from 'src/app/lib/data/models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private url = '/api/header';
  public headerModel: HeaderModel;
  public menuItems: Menu[] =[];
  public screenWidth: any;
  public leftMenuToggle: boolean = false;
  public mainMenuToggle: boolean = false;
  public ar: any[];

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
  
  LEFTMENUITEMS: Menu[] = [
    {
      title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
        {
          title: 'mens fashion', type: 'link', active: false, children: [
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'top', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'shirts', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' }
          ]
        },
        {
          title: 'women fashion', type: 'link', active: false, children: [
            { path: '/home/fashion', title: 'dresses', type: 'link' },
            { path: '/home/fashion', title: 'skirts', type: 'link' },
            { path: '/home/fashion', title: 'westarn wear', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'bottom wear', type: 'link' }
          ]
        },
      ]
    },
    {
      title: 'bags', type: 'sub', active: false, children: [
        { path: '/home/fashion', title: 'shopper bags', type: 'link' },
        { path: '/home/fashion', title: 'laptop bags', type: 'link' },
        { path: '/home/fashion', title: 'clutches', type: 'link' },
        {
          path: '/home/fashion', title: 'purses', type: 'link', active: false, children: [
            { path: '/home/fashion', title: 'purses', type: 'link' },
            { path: '/home/fashion', title: 'wallets', type: 'link' },
            { path: '/home/fashion', title: 'leathers', type: 'link' },
            { path: '/home/fashion', title: 'satchels', type: 'link' }
          ]
        },
      ]
    },
    {
      title: 'footwear', type: 'sub', active: false, children: [
        { path: '/home/fashion', title: 'sport shoes', type: 'link' },
        { path: '/home/fashion', title: 'formal shoes', type: 'link' },
        { path: '/home/fashion', title: 'casual shoes', type: 'link' }
      ]
    },
    {
      path: '/home/fashion', title: 'watches', type: 'link'
    },
    {
      title: 'Accessories', type: 'sub', active: false, children: [
        { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
        { path: '/home/fashion', title: 'caps and hats', type: 'link' },
        { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
        {
          path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
            { path: '/home/fashion', title: 'necklaces', type: 'link' },
            { path: '/home/fashion', title: 'earrings', type: 'link' },
            { path: '/home/fashion', title: 'rings & wrist wear', type: 'link' },
            {
              path: '/home/fashion', title: 'more...', type: 'link', active: false, children: [
                { path: '/home/fashion', title: 'ties', type: 'link' },
                { path: '/home/fashion', title: 'cufflinks', type: 'link' },
                { path: '/home/fashion', title: 'pockets squares', type: 'link' },
                { path: '/home/fashion', title: 'helmets', type: 'link' },
                { path: '/home/fashion', title: 'scarves', type: 'link' },
                {
                  path: '/home/fashion', title: 'more...', type: 'link', active: false, children: [
                    { path: '/home/fashion', title: 'accessory gift sets', type: 'link' },
                    { path: '/home/fashion', title: 'travel accessories', type: 'link' },
                    { path: '/home/fashion', title: 'phone cases', type: 'link' }
                  ]
                },
              ]
            }
          ]
        },
      ]
    },
    {
      path: '/home/fashion', title: 'house of design', type: 'link'
    },
    {
      title: 'beauty & personal care', type: 'sub', active: false, children: [
        { path: '/home/fashion', title: 'makeup', type: 'link' },
        { path: '/home/fashion', title: 'skincare', type: 'link' },
        { path: '/home/fashion', title: 'premium beaty', type: 'link' },
        {
          path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
            { path: '/home/fashion', title: 'fragrances', type: 'link' },
            { path: '/home/fashion', title: 'luxury beauty', type: 'link' },
            { path: '/home/fashion', title: 'hair care', type: 'link' },
            { path: '/home/fashion', title: 'tools & brushes', type: 'link' }
          ]
        },
      ]
    },
    {
      path: '/home/fashion', title: 'home & decor', type: 'link'
    },
    {
      path: '/home/fashion', title: 'kitchen', type: 'link'
    }
  ];

  // Array
  leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
