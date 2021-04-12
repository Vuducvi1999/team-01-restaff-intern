import { Routes } from '@angular/router';

export const content: Routes = [

  {
    path: 'suppliers',
    loadChildren: () => import('../../components/suppliers/suppliers.module').then(m => m.SuppliersModule),
    data: {
      breadcrumb: "Suppliers"
    }
  }
];
