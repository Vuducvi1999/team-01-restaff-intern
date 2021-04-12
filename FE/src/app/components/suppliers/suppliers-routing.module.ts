import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSuppliersComponent } from './list-suppliers/list-suppliers.component';
import { CreateSuppliersComponent } from './create-suppliers/create-suppliers.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-suppliers',
        component: ListSuppliersComponent,
        data: {
          title: "Supplier List",
          breadcrumb: "Supplier List"
        }
      },
      {
        path: 'create-suppliers',
        component: CreateSuppliersComponent,
        data: {
          title: "Create Supplier",
          breadcrumb: "Create Supplier"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuppliersRoutingModule { }
