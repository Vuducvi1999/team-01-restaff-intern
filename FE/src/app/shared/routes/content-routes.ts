import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'suppliers',
    loadChildren: () =>
      import('../../components/suppliers/suppliers.module').then(
        (m) => m.SuppliersModule
      ),
    data: {
      breadcrumb: 'Suppliers',
    },
  },
  {
    path: 'banners',
    loadChildren: () =>
      import('../../components/banners/banners.module').then(
        (m) => m.BannersModule
      ),
    data: {
      breadcrumb: 'Banners',
    },
  },
  {
    path: 'socialmedias',
    loadChildren: () =>
      import('../../components/socialmedias/socialmedias.module').then(
        (m) => m.SocialMediasModule
      ),
    data: {
      breadcrumb: 'Banners',
    },
  },
];
