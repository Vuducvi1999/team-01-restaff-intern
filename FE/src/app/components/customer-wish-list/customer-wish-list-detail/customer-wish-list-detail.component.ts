import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
import { CommentService } from 'src/app/lib/data/services/comments/comment.service';
import { CustomerWishListModel } from 'src/app/lib/data/models/customerWishList/customerWishList.model';
import { CustomerWishListService } from 'src/app/lib/data/services/customerWishLists/customerWishList.service';

@Component({
  selector: 'app-customer-wish-list-detail',
  templateUrl: './customer-wish-list-detail.component.html',
  styleUrls: ['./customer-wish-list-detail.component.scss'],
  providers: [CustomerWishListService],
})
export class CustomerWishListDetailComponent implements OnInit {
  public wishListForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public comment: CustomerWishListModel;
  @Input() item;

  constructor(
    private formBuilder: FormBuilder,
    private service: CustomerWishListService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.wishListForm = this.formBuilder.group({
      productId: [this.item ? this.item.productId : ''],
      customerId: [this.item ? this.item.customerId : ''],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `Update` : `Add`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save() {
    if (this.wishListForm.invalid) {
      console.log(this.wishListForm);
      return;
    }

    this.comment = {
      id: this.item ? this.item.id : '',
      productId: this.wishListForm.value.productId,
      customerId: this.wishListForm.value.customerId,
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.service
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
