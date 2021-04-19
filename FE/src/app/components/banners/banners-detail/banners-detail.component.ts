import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-banners-detail',
  templateUrl: './banners-detail.component.html',
  styleUrls: ['./banners-detail.component.scss'],
  providers: [],
})
export class BannersDetailComponent implements OnInit {
  public bannersForm: FormGroup;
  public item: any;
  public banner: BannerModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private bannersService: BannersService
  ) { }

  ngOnInit() {
    this.loadFormItem();
    this.createModal();
  }
  loadFormItem() {
    this.bannersForm = this.formBuilder.group({
      title: [this.item ? this.item.title : '', Validators.required],
      description: [this.item ? this.item.description : ''],
      link: [this.item ? this.item.link : '', Validators.required],
      imageURL: [this.item ? this.item.imageUrl : '', Validators.required],
      displayOrder: [
        this.item ? this.item.displayOrder : '',
        Validators.required,
      ],
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.item != null ? `Update ${this.item.title}` : `Add Banner`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  get bannersFormControl() {
    return this.bannersForm.controls;
  }

  saveBanner(event: any) {
    this.banner = {
      title: this.bannersForm.controls.title.value,
      description: this.bannersForm.controls.description.value,
      link: this.bannersForm.controls.link.value,
      imageURL: this.bannersForm.controls.imageURL.value,
      displayOrder: this.bannersForm.controls.displayOrder.value,
      id: this.item ? this.item.id : '',
    };

    this.submitted = true;

    if (this.bannersForm.valid) {
      this.bannersService.save(this.banner)
        .then((res) => {
          this.bannersForm.reset();
          this.submitted = false;
          this.ngbActiveModal.close();
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }

    // if (this.item) {
    //   return this.bannersService
    //     .update(this.banner)
    //     .then((res) => {
    //       this.bannersForm.reset();
    //       this.submitted = false;
    //     })
    //     .catch((er) => {
    //       if (er.error.hasError) {
    //         console.log(er.error.message);
    //       }
    //     });
    // }

    // return this.bannersService
    //   .create(this.banner)
    //   .then((res) => {
    //     this.bannersForm.reset();
    //     this.submitted = false;
    //   })
    //   .catch((er) => {
    //     if (er.error.hasError) {
    //       console.log(er.error.message);
    //     }
    //   });

  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
}
