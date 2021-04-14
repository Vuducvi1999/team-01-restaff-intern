import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerModel } from 'src/app/lib/data/models';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-update-banners',
  templateUrl: './update-banners.component.html',
  styleUrls: ['./update-banners.component.scss'],
})
export class UpdateBannersComponent implements OnInit {
  public item!: any;
  public bannersForm: FormGroup;
  public permissionForm: FormGroup;
  public banner: BannerModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private bannersService: BannersService
  ) {

  }
  ngOnInit(): void {
    console.log(this.item);
    this.updateBannerForm();
    this.createModal();
  }


  updateBannerForm() {
    this.bannersForm = this.formBuilder.group({
      title: [this.item.title, Validators.required],
      description: [''],
      link: ['', Validators.required],
      imageURL: ['', Validators.required],
      displayOrder: ['', Validators.required]
    })
  }

  updateBanner(event: any) {
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
    this.bannersService.update(formData).then(res => {
      console.log(res);
      this.bannersForm.reset();
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = "Update Banner";
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  get bannersFormControl() {
    return this.bannersForm.controls;
  }
  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }


}
