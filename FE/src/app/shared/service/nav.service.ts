import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      title: 'Suppliers',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/suppliers/list-suppliers',
          title: 'Supplier List',
          type: 'link',
        },
        {
          path: '/suppliers/create-suppliers',
          title: 'Create Supplier',
          type: 'link',
        },
      ],
    },
    {
      title: 'Banners',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        { path: '/banners/list-banners', title: 'Banners List', type: 'link' },
      ],
    },
    {
      title: 'Social Medias',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/social-medias/list-social-medias',
          title: 'Social Media List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Files',
      icon: 'camera',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/files/list-files',
          title: 'File List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Coupon',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/coupons/list-coupons',
          title: 'Coupon List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Settings',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/profiles/profile-settings',
          title: 'Profiles',
          type: 'link',
        },
      ],
    },
    {
      title: 'Users',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/users/list-users',
          title: 'User List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Category',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/categories/list-categories',
          title: 'Category List',
          type: 'link',
        },
      ],
    },
  ];
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
