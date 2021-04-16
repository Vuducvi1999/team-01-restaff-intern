import { Routes } from '@angular/router';
import { ElementsComponent } from 'src/app/FeUser/elements/elements.component';
import { PagesComponent } from 'src/app/FeUser/pages/pages.component';
import { ShopComponent } from 'src/app/FeUser/shop/shop.component';

export const FeUser: Routes = [
  {
    path: '',
    redirectTo: 'home/fashion',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../../FeUser/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'shop',
    component: ShopComponent,
    loadChildren: () =>
      import('../../FeUser/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'pages',
    component: PagesComponent,
    loadChildren: () =>
      import('../../FeUser/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'elements',
    component: ElementsComponent,
    loadChildren: () =>
      import('../../FeUser/elements/elements.module').then(
        (m) => m.ElementsModule
      ),
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'home/fashion',
  },
];
