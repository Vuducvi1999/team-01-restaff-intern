import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardsAdminService } from '../lib/guards/auth.guard';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "blog",
    component: BlogsComponent,
  },
  {
    path: "product",
    component: ProductListComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "blog/:id",
    component: BlogDetailComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardsAdminService],
})
export class PagesRoutingModule { }
