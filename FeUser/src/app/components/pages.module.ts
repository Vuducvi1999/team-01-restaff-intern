import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import { SharedModule } from "../shared/shared.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { HomeComponent } from "./home/home.component";
// Widgest Components
import { SliderComponent } from "./home/widgets/slider/slider.component";
import { LogoComponent } from "./home/widgets/logo/logo.component";
import { InstagramComponent } from "./home/widgets/instagram/instagram.component";
import { ServicesComponent } from "./home/widgets/services/services.component";
import { CollectionComponent } from "./home/widgets/collection/collection.component";
import { BlogComponent } from "./blog/blog.component";
import { BlogService } from "../lib/data/service/blog.service";
@NgModule({
  declarations: [
    HomeComponent,
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent,
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule,
  ],
  providers: [BlogService],
})
export class PagesModule {}
