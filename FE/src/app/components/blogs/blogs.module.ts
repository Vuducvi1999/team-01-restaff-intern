import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BlogService } from 'src/app/lib/data/services/blogs/blog.service';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';

@NgModule({
  declarations: [ListBlogsComponent, BlogsDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
    NgbModule,
    Ng2SmartTableModule,
    SharedModule,
  ],
  providers: [BlogService],
})
export class BlogsModule {}
