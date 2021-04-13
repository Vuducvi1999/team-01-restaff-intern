import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [ListCategoriesComponent, CreateCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule
  ]
})
export class CategogyModule { }
