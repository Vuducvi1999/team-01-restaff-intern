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
    path: 'profiles',
    loadChildren: () =>
      import('../../components/profiles/profiles.module').then(
        (m) => m.ProfilesModule
      ),
    data: {
      breadcrumb: 'Profiles',
    },
  },
  {
    path: 'social-medias',
    loadChildren: () =>
      import('../../components/social-medias/social-medias.module').then(
        (m) => m.SocialMediasModule
      ),
    data: {
      breadcrumb: 'Social Medias',
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
  {
    path: 'products',
    loadChildren: () =>
      import('../../components/products/products.module').then(
        (m) => m.ProductModule
      ),
    data: {
      breadcrumb: 'Products',
    },
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('../../components/blogs/blogs.module').then((m) => m.BlogsModule),
    data: {
      breadcrumb: 'Blogs',
    },
  },
  {
    path: 'page-content',
    loadChildren: () =>
      import('../../components/pageContents/pageContent.module').then(
        (m) => m.PageContentModule
      ),
    data: {
      breadcrumb: 'page-content',
    },
  },
  {
    path: 'information-website',
    loadChildren: () =>
      import('../../components/information-website/information.module').then(
        (m) => m.InformationWebsiteModule
      ),
    data: {
      breadcrumb: 'Information Website',
    },
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('../../components/customers/customers.module').then((m) => m.CustomerModule),
    data: {
      breadcrumb: 'Customers',
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../../components/contacts/contact.module').then(
        (m) => m.ContactModule
      ),
    data: {
      breadcrumb: 'Contact',
    },
  },
];
