import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerWishListComponent } from './list-customer-wish-list/list-customer-wish-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-customer-wish-list',
        component: ListCustomerWishListComponent,
        data: {
          title: 'Comment List',
          breadcrumb: 'CommentList',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerWishListRouting {}
