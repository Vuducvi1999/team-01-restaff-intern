import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBoxThreeComponent } from '../shared/components/product/product-box-three/product-box-three.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '/product',
    component: ProductBoxThreeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
