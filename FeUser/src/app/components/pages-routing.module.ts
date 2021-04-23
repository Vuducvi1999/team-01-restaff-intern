import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogsComponent } from "./blogs/blogs.component";
import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./product/product-list/product-list.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "",
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
