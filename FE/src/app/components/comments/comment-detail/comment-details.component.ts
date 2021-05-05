import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
import { CommentModel } from 'src/app/lib/data/models/comments/comment.model';
import { CommentService } from 'src/app/lib/data/services/comments/comment.service';
@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss'],
  providers: [CommentService],
})
export class CommentDetailComponent implements OnInit {
  public commentForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public comment: CommentModel;
  @Input() item;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.commentForm = this.formBuilder.group({
      fullName: [this.item ? this.item.fullName : ''],
      customerId: [this.item ? this.item.customerId : ''],
      entityId: [this.item ? this.item.entityId : ''],
      entityType: [this.item ? this.item.entityType : ''],
      content: [this.item ? this.item.content : ''],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `Update` : `Add`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save() {
    if (this.commentForm.invalid) {
      console.log(this.commentForm);
      return;
    }

    this.comment = {
      id: this.item ? this.item.id : '',
      fullName: this.commentForm.value.fullName,
      customerId: this.commentForm.value.customerId,
      entityId: this.commentForm.value.entityId,
      entityType: this.commentForm.value.entityType,
      content: this.commentForm.value.content,
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.commentService
      .create(this.comment)
      .then(() => {
        this.ngbActiveModal.close();
      })
      .catch((er) => {
        if (er) {
          console.log(er);
        }
      });
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
}
