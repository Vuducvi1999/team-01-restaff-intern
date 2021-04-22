import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
// Widgest Components
import { SliderComponent } from './home/widgets/slider/slider.component';
import { BlogComponent } from './home/widgets/blog/blog.component';
import { LogoComponent } from './home/widgets/logo/logo.component';
import { InstagramComponent } from './home/widgets/instagram/instagram.component';
import { ServicesComponent } from './home/widgets/services/services.component';
import { CollectionComponent } from './home/widgets/collection/collection.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
@NgModule({

  declarations: [
   HomeComponent,
   // Widgest Components
   SliderComponent,
   BlogComponent,
   LogoComponent,
   InstagramComponent,
   ServicesComponent,
   CollectionComponent
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule
  ],
  exports :  [
    HomeComponent
  ]
})
export class PagesModule { }
