import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./blog/blog.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
    path: "",
    component: HomeComponent,
  },
  {
    path: "blog",
    component: BlogComponent,
  },
  {
    path: 'product',
    component: ProductListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
