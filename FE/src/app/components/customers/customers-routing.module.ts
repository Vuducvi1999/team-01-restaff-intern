import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";
import { CustomerInfoDetailsComponent } from "./customer-info-details/customer-info-details.component";
import { ListCustomerInfoComponent } from "./list-customer-info/list-customer-info.component";
import { ListCustomersComponent } from "./list-customers/list-customers.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-customers',
          component: ListCustomersComponent,
          data: {
            title: "Customer List",
            breadcrumb: "Customer List"
          }
        },
        {
          path: 'create-customers',
          component: CustomerDetailsComponent,
          data: {
            title: "Create Customer",
            breadcrumb: "Create Customer"
          }
        },
        {
            path: 'list-customers-info',
            component: ListCustomerInfoComponent,
            data: {
              title: "Customer Information List",
              breadcrumb: "Customer Information List"
            }
          },
          {
            path: 'create-customers-info',
            component: CustomerInfoDetailsComponent,
            data: {
              title: "Create Customer Information",
              breadcrumb: "Create Customer Information"
            }
          }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }