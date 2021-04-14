import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerModel } from 'src/app/lib/data/models';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-banners-detail',
  templateUrl: './banners-detail.component.html',
  styleUrls: ['./banners-detail.component.scss'],
  providers: []
})
export class BannersDetailComponent implements OnInit {
  public bannersForm: FormGroup;
  public item: any;
  public banner: BannerModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private bannersService: BannersService
  ) { }

  ngOnInit() {
    this.createForm();
    this.createModal();
  }

  createBannerForm() {
    this.bannersForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      link: ['', Validators.required],
      imageURL: ['', Validators.required],
      displayOrder: ['', Validators.required]
    })
  }
  updateBannerForm() {
    this.bannersForm = this.formBuilder.group({
      title: [this.item.title, Validators.required],
      description: [this.item ? this.item.description : ''],
      link: [this.item.link, Validators.required],
      imageURL: [this.item.imageUrl, Validators.required],
      displayOrder: [this.item.displayOrder, Validators.required]
    })
  }

  createForm() {
    if (this.item) {
      this.updateBannerForm();
    }
    if (!this.item) {
      this.createBannerForm();
    }
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item != null ? `Update ${this.item.title}` : `Add Banner`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  get bannersFormControl() {
    return this.bannersForm.controls;
  }

  createBanner(event: any) {
    this.banner = {
      title: this.bannersForm.controls.title.value,
      description: this.bannersForm.controls.description.value,
      link: this.bannersForm.controls.link.value,
      imageURL: this.bannersForm.controls.imageURL.value,
      displayOrder: this.bannersForm.controls.displayOrder.value,
      id: ""
    }

    const formData = new FormData();
    formData.append("title", this.banner.title);
    formData.append("description", this.banner.description);
    formData.append("link", this.banner.link);
    formData.append("imageURL", this.banner.imageURL);
    formData.append("displayOrder", this.banner.displayOrder.toString());

    this.submitted = true;
    this.bannersService.create(formData).then(res => {
      this.bannersForm.reset();
      this.submitted = false;
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });
  }

  updateBanner(event: any) {
    this.banner = {
      title: this.bannersForm.controls.title.value,
      description: this.bannersForm.controls.description.value,
      link: this.bannersForm.controls.link.value,
      imageURL: this.bannersForm.controls.imageURL.value,
      displayOrder: this.bannersForm.controls.displayOrder.value,
      id: this.item.id
    }

    const formData = new FormData();
    formData.append("title", this.banner.title);
    formData.append("description", this.banner.description);
    formData.append("link", this.banner.link);
    formData.append("imageURL", this.banner.imageURL);
    formData.append("displayOrder", this.banner.displayOrder.toString());
    formData.append("id", this.banner.id);

    this.submitted = true;
    this.bannersService.update(formData).then(res => {
      this.bannersForm.reset();
      this.submitted = false;
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });
  }

  onClick(event: any) {
    if (this.item) {
      this.updateBanner(event);
    }
    if (!this.item) {
      this.createBanner(event);
    }
  }
  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }


}
