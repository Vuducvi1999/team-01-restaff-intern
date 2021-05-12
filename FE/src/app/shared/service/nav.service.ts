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
      title: 'Blogs',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/blogs/list-blogs',
          title: 'Blog List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Category',
      icon: 'grid',
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
    {
      title: 'Product',
      icon: 'package',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/products/list-products',
          title: 'Product List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Customer',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/customers/list-customers',
          title: 'Customer List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Page Content',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/page-content/list-page-content',
          title: 'Page Content List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Website Information',
      icon: 'info',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/information-website/list-information-website',
          title: 'Information',
          type: 'link',
        },
      ],
    },
    {
      title: 'Contact',
      icon: 'info',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/contact/list-contact',
          title: 'Contact',
          type: 'link',
        },
      ],
    },
    {
      title: 'Orders',
      icon: 'users',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/orders/list-orders',
          title: 'Orders List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Comment',
      icon: 'info',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/comment/list-comment',
          title: 'Comment List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Customer Wish List',
      icon: 'info',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/customer-wish-list/list-customer-wish-list',
          title: 'Customer Wish List',
          type: 'link',
        },
      ],
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
