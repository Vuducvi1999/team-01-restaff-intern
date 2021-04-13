import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SuppliersRoutingModule } from '../suppliers/suppliers-routing.module';
import { CreateSocialMediasComponent } from './create-socialmedias/create-socialmedias.component';
import { ListSocialMediasComponent } from './list-socialmedias/list-socialmedias.component';
import { SocialMediasRoutingModule } from './socialmedias-routing.module';
import { UpdateSocialMediasComponent } from './update-socialmedias/update-socialmedias.component';

@NgModule({
  declarations: [
    ListSocialMediasComponent,
    CreateSocialMediasComponent,
    UpdateSocialMediasComponent,
  ],
  imports: [
    CommonModule,
    SocialMediasRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule,
  ],
})
export class SocialMediasModule {}
