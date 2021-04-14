import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-create-social-media',
  templateUrl: './create-social-media.component.html',
  styleUrls: ['./create-social-media.component.scss'],
})
export class CreateSocialMediaComponent implements OnInit {
  public socialMediaForm: FormGroup;
  public permissionForm: FormGroup;
  public socialMedia: SocialMediaModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public data: any;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private service: SocialMediaService
  ) {}
  createSocialMediaForm() {
    this.socialMediaForm = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      iconUrl: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
    this.createModal();
    console.log(this.data);
  }

  createUpdateSocialMediaForm() {
    this.socialMediaForm = this.formBuilder.group({
      title: [this.data ? this.data.title : '', Validators.required],
      link: [this.data ? this.data.link : '', Validators.required],
      iconUrl: [this.data ? this.data.iconUrl : '', Validators.required],
      displayOrder: [
        this.data ? this.data.displayOrder : '',
        Validators.required,
      ],
    });
    this.createModal();
    console.log(this.data);
  }

  createPermissionForm() {}

  createSocialMedia() {
    this.socialMedia = {
      title: this.socialMediaForm.controls.title.value,
      link: this.socialMediaForm.controls.link.value,
      iconUrl: this.socialMediaForm.controls.iconUrl.value,
      displayOrder: this.socialMediaForm.controls.displayOrder.value,
      id: '',
    };
    const formData = new FormData();
    formData.append('title', this.socialMedia.title);
    formData.append('link', this.socialMedia.link);
    formData.append('iconUrl', this.socialMedia.iconUrl);
    formData.append('displayOrder', this.socialMedia.displayOrder.toString());

    if (this.socialMediaForm.dirty && this.socialMediaForm.valid) {
      this.service.create(formData).then(() => {
        this.socialMediaForm.reset();
        this.ngbActiveModal.close();
      });
    }
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.data != null ? `Update ${this.data.title}` : `Add Social Media`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  updateSocialMedia() {
    this.socialMedia = {
      title: this.socialMediaForm.controls.title.value,
      link: this.socialMediaForm.controls.link.value,
      iconUrl: this.socialMediaForm.controls.iconUrl.value,
      displayOrder: this.socialMediaForm.controls.displayOrder.value,
      id: this.data.id,
    };
    const formData = new FormData();
    formData.append('title', this.socialMedia.title);
    formData.append('link', this.socialMedia.link);
    formData.append('iconUrl', this.socialMedia.iconUrl);
    formData.append('displayOrder', this.socialMedia.displayOrder.toString());
    formData.append('id', this.socialMedia.id);
    if (this.socialMediaForm.dirty && this.socialMediaForm.valid) {
      this.service.update(formData).then(() => {
        this.socialMediaForm.reset();
        this.ngbActiveModal.close();
      });
    }
  }

  save() {
    this.submitted = true;
    if (this.data == null) {
      this.createSocialMedia();
    } else {
      this.updateSocialMedia();
    }
  }

  get SocialMediaFormControl() {
    return this.socialMediaForm.controls;
  }
  ngOnInit(): void {
    if (this.data == null) {
      this.createSocialMediaForm();
    } else {
      this.createUpdateSocialMediaForm();
    }
  }
}
