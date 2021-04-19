import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponModel } from 'src/app/lib/data/models/coupons/coupon.model';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.scss'],
})
export class CouponDetailComponent implements OnInit {
  public couponForm: FormGroup;
  public coupon: CouponModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public item: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private couponService: CouponService
  ) {}
  loadItemForm() {
    this.couponForm = this.formBuilder.group({
      code: [this.item ? this.item.code : '', Validators.required],
      name: [this.item ? this.item.name : '', Validators.required],
      hasPercent: [this.item?.hasPercent ? true : false],
      value: [this.item ? this.item.value : '', Validators.required],
      startDate: [this.item ? this.item.startDate : '', Validators.required],
      endDate: [
        this.item ? this.item.endDate : '',
        [Validators.required, this.compareDate('startDate')],
      ],
    });
  }

  compareDate(matchTo: string): ValidatorFn {
    console.log(matchTo);
    return (control: AbstractControl) => {
      return control?.value > control?.parent?.controls[matchTo].value
        ? null
        : { compared: true };
    };
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.item != null ? `Update ${this.item.name}` : `Add Coupon`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  saveCoupon(event: any) {
    this.coupon = {
      code: this.couponForm.controls.code?.value,
      name: this.couponForm.controls.name?.value,
      hasPercent: this.couponForm.controls.hasPercent?.value,
      value: this.couponForm.controls.value?.value,
      startDate: this.couponForm.controls.startDate?.value,
      endDate: this.couponForm.controls.endDate?.value,
      id: this.item ? this.item.id : '',
    };

    this.submitted = true;

    if (this.couponForm.valid) {
      return this.couponService
        .save(this.coupon)
        .then(() => {
          this.couponForm.reset();
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
  get CouponFormControl() {
    return this.couponForm.controls;
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
  ngOnInit(): void {
    this.loadItemForm();
    this.createModal();
  }
}
