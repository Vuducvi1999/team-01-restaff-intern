import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListCategoriesComponent, CreateCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgbModalModule,
    Ng2SmartTableModule
  ]
})
export class CategoriesModule { }
