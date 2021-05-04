import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";
import { BarRatingModule } from "ngx-bar-rating";
import { LazyLoadImageModule, scrollPreset } from "ng-lazyload-image";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { TranslateModule } from "@ngx-translate/core";

//UploadFile
import { NgxDropzoneModule } from 'ngx-dropzone';

// Header and Footer Components
import { HeaderOneComponent } from "./header/header-one/header-one.component";
import { FooterOneComponent } from "./footer/footer-one/footer-one.component";

// Components
import { LeftMenuComponent } from "./components/left-menu/left-menu.component";
import { MenuComponent } from "./components/menu/menu.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { ProductBoxOneComponent } from "./components/product/product-box-one/product-box-one.component";
import { ProductBoxVerticalComponent } from "./components/product/product-box-vertical/product-box-vertical.component";
import { ProductBoxVerticalSliderComponent } from "./components/product/product-box-vertical-slider/product-box-vertical-slider.component";

// Modals Components
import { NewsletterComponent } from "./components/modal/newsletter/newsletter.component";
import { QuickViewComponent } from "./components/modal/quick-view/quick-view.component";
import { CartModalComponent } from "./components/modal/cart-modal/cart-modal.component";
import { CartVariationComponent } from "./components/modal/cart-variation/cart-variation.component";
import { VideoModalComponent } from "./components/modal/video-modal/video-modal.component";
import { SizeModalComponent } from "./components/modal/size-modal/size-modal.component";
import { AgeVerificationComponent } from "./components/modal/age-verification/age-verification.component";

// Skeleton Loader Components
import { SkeletonProductBoxComponent } from "./components/skeleton/skeleton-product-box/skeleton-product-box.component";

// Layout Box
import { LayoutBoxComponent } from "./components/layout-box/layout-box.component";

// Tap To Top
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";

// Pipes
import { DiscountPipe } from "./pipes/discount.pipe";
import { HomeComponent } from "../components/home/home.component";
import { ProductBoxComponent } from "./components/product/product-box/product-box.component";

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ImageWrapperComponent } from "./components/imageWrapper/imageWapper.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";

import { FilterPipeModule } from "ngx-filter-pipe";
import { SearchService } from "../lib/data/services/search/search.service";

@NgModule({
  declarations: [
    ProductBoxComponent,
    HeaderOneComponent,
    FooterOneComponent,
    LeftMenuComponent,
    MenuComponent,
    SettingsComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe,
    ImageWrapperComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    NgxDropzoneModule,
    LazyLoadImageModule.forRoot({
      // preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    NgxSkeletonLoaderModule,
    TranslateModule,
    SweetAlert2Module.forRoot(),
    FilterPipeModule,
  ],
  providers: [SearchService],
  exports: [
    ProductBoxComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    HeaderOneComponent,
    FooterOneComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe,
    ImageWrapperComponent,
    UploadFileComponent,
  ],
})
export class SharedModule {}
