import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListBannersComponent } from './list-banners/list-banners.component';
import { CreateBannersComponent } from './create-banners/create-banners.component';
import { BannersRoutingModule } from './banners-routing.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule,
    BannersRoutingModule
  ],
  declarations: [ListBannersComponent, CreateBannersComponent],
  providers:[]
})
export class BannersModule { }
