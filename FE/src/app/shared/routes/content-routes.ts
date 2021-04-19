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

  },
  {
    path: 'social-medias',
    loadChildren: () =>
      import('../../components/social-medias/social-medias.module').then(
        (m) => m.SocialMediasModule
      ),
    data: {
      breadcrumb: 'Banners',
    },
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../../components/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
    data: {
      breadcrumb: 'Categories',
    },
  },
  {
    path: 'files',
    loadChildren: () =>
      import('../../components/files/files.module').then((m) => m.FilesModule),
  },
  {
    path: 'coupons',
    loadChildren: () =>
      import('../../components/coupons/coupons.module').then(
        (m) => m.CouponsModule
      ),
    data: {
      breadcrumb: 'Coupons',
    },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../components/users/users.module').then((m) => m.UsersModule),
    data: {
      breadcrumb: 'Users',
    },
  },
];
