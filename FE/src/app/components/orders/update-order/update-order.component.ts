import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { OrderModel } from 'src/app/lib/data/models/orders/order.model';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
  providers: [OrdersService],
})
export class UpdateOrderComponent implements OnInit {
  public orderForm: FormGroup;
  public item: any;
  public order = new OrderModel();
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;
  public fileURL: (string | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ordersService: OrdersService
  ) {

  }

  ngOnInit() {
    this.loadFormItem();
    this.createModal();
    if (this.item) {
      this.fileURL = [];
      this.fileURL.push(this.item.imageUrl);
    }
  }
  loadFormItem() {
    this.orderForm = this.formBuilder.group({
      fullName: [this.item.fullName, Validators.required],
      address: [this.item.address,Validators.required],
      email: [this.item.email,Validators.required],
      phone: [this.item.phone, Validators.required],
      status:[this.item.status,Validators.required]
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      `Update Order`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  get orderFormControl() {
    return this.orderForm.controls;
  }

  save(event: any) {
    this.order = {
      fullName: this.orderForm.controls.fullName.value,
      address: this.orderForm.controls.address.value,
      email: this.orderForm.controls.email.value,
      phone: this.orderForm.controls.phone.value,
      status: this.orderForm.controls.status.value,
      id: this.item.id,
      totalAmount: this.item.totalAmount,
      totalItem:this.item.totalItem

    };

    this.submitted = true;

    if (this.orderForm.valid) {
      this.ordersService
        .update(this.order)
        .then((res) => {
          this.orderForm.reset();
          this.submitted = false;
          this.ngbActiveModal.close();
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if (!this.fileURL) {
      this.fileURL = [];
    }

    // if (event.add) {
    this.fileURL = [...this.fileURL, ...event.add];
    // }

    if (event.remove) {
      this.fileURL.forEach((e : string, i) => {
        if (e.includes(event.remove)) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if (event.removeAll) {
      this.fileURL = [];
    }

    this.orderForm.controls.imageUrl.setValue(this.fileURL.join(','));
  }
}
