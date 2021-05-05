import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentDetailComponent } from './comment-detail/comment-details.component';
import { CommentRouting } from './comment-routing.module';
import { ListCommentComponent } from './list-comment/list-comment.component';

@NgModule({
  declarations: [ListCommentComponent, CommentDetailComponent],
  imports: [
    CommonModule,
    CommentRouting,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgbModalModule,
    Ng2SmartTableModule,
    CKEditorModule,
  ],
})
export class CommentModule {}
