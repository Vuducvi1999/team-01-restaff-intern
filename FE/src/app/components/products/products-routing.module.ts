import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListProductsComponent } from "./list-products/list-products.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-products',
          component: ListProductsComponent,
          data: {
            title: "Product List",
            breadcrumb: "Product List"
          }
        },
        {
          path: 'create-products',
          component: ProductDetailsComponent,
          data: {
            title: "Create Product",
            breadcrumb: "Create Product"
          }
        }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }