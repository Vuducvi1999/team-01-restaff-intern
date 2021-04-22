import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBoxThreeComponent } from '../shared/components/product/product-box-three/product-box-three.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product',
    component: ProductListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
