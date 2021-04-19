import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from './directives/fullscreen.directive';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ModalHeaderComponent } from './components/modals/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modals/modal-footer/modal-footer.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSingleImageComponent } from './components/modals/modal-single-image/modal-single-image.component';
import { FileService } from '../lib/data/services';
import { ModalMultiImageComponent } from './components/modals/modal-multi-image/modal-multi-image.component';
import { ModalFileComponent } from './components/modals/modal-file/modal-file.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    ModalSingleImageComponent,
    ModalMultiImageComponent,
    ModalFileComponent,
    UploadFileComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModalModule],
  providers: [NavService, WINDOW_PROVIDERS, FileService],
  exports: [
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalSingleImageComponent,
    ModalMultiImageComponent,
    ModalFileComponent,
    UploadFileComponent,
  ],
})
export class SharedModule {}
