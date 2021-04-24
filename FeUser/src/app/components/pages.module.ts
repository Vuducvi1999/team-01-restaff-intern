import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import { SharedModule } from "../shared/shared.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { HomeComponent } from "./home/home.component";
// Widgest Components

import { BlogComponent } from "./home/widgets/blog/blog.component";
import { LogoComponent } from "./home/widgets/logo/logo.component";
import { InstagramComponent } from "./home/widgets/instagram/instagram.component";
import { ServicesComponent } from "./home/widgets/services/services.component";
import { CollectionComponent } from "./home/widgets/collection/collection.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PriceComponent } from "./product/widgets/price/price.component";
import { SizeComponent } from "./product/widgets/size/size.component";
import { BrandsComponent } from "./product/widgets/brands/brands.component";
import { ColorsComponent } from "./product/widgets/colors/colors.component";
import { Ng5SliderModule } from "ng5-slider";
import { GridComponent } from "./product/widgets/grid/grid.component";
import { SliderComponent } from "./home/slider/slider.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { BlogDetailComponent } from "./blogs/blog-detail/blog-detail.component";
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
    ProductListComponent,
    BrandsComponent,
    ColorsComponent,
    SizeComponent,
    PriceComponent,
    GridComponent,
    BlogsComponent,
    CartComponent,
    CheckoutComponent,
    BlogDetailComponent,
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule,
    InfiniteScrollModule,
    Ng5SliderModule,
  ],
  providers: [],
  exports: [
    BrandsComponent,
    ColorsComponent,
    SizeComponent,
    PriceComponent,
    GridComponent,
  ],
})
export class PagesModule {}
