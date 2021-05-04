import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCommentComponent } from './list-comment/list-comment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-comment',
        component: ListCommentComponent,
        data: {
          title: 'Coupon List',
          breadcrumb: 'CouponList',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRouting {}
