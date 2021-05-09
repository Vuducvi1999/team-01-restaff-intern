import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerWishListDetailComponent } from './customer-wish-list-detail/customer-wish-list-detail.component';
import { CustomerWishListRouting } from './customer-wish-list-routing.module';
import { ListCustomerWishListComponent } from './list-customer-wish-list/list-customer-wish-list.component';

@NgModule({
  declarations: [
    ListCustomerWishListComponent,
    CustomerWishListDetailComponent,
  ],
  imports: [
    CommonModule,
    CustomerWishListRouting,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgbModalModule,
    Ng2SmartTableModule,
    CKEditorModule,
  ],
})
export class CustomerWishListModule {}
