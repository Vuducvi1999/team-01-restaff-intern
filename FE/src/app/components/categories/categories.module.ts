import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [ListSuppliersComponent, CreateSuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule
  ]
})
export class CategogyModule { }
