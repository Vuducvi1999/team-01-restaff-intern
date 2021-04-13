import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBannersComponent } from './create-banners/create-banners.component';
import { ListBannersComponent } from './list-banners/list-banners.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-banners',
        component: ListBannersComponent,
        data: {
          title: "Banner List",
          breadcrumb: "Banner List"
        }
      },
      {
        path: 'create-banners',
        component: CreateBannersComponent,
        data: {
          title: "Create Banners",
          breadcrumb: "Create Banners"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BannersRoutingModule { }
