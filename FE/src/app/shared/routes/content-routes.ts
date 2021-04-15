import { Routes } from '@angular/router';

export const content: Routes = [

  {
    path: 'suppliers',
    loadChildren: () => import('../../components/suppliers/suppliers.module').then(m => m.SuppliersModule),
    data: {
      breadcrumb: "Suppliers"
    }

  },
  {
    path: 'banners',
    loadChildren: () => import('../../components/banners/banners.module').then(m => m.BannersModule),
    data: {
      breadcrumb: "Banners"
    }

  }
  ,
  {
    path: 'profiles',
    loadChildren: () => import('../../components/profiles/profiles.module').then(m => m.ProfilesModule),
    data: {
      breadcrumb: "Profiles"
    }

  }
];
