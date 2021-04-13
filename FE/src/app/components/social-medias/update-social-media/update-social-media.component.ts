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
  selector: 'app-update-social-media',
  templateUrl: './update-social-media.component.html',
  styleUrls: ['./update-social-media.component.scss'],
})
export class UpdateSocialMediaComponent implements OnInit {
  public socialMediaForm: FormGroup;
  public permissionForm: FormGroup;
  public socialMedia: SocialMediaModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;

  constructor(
    private formBuilder: FormBuilder,
    private service: SocialMediaService,
    private ngbActiveModal: NgbActiveModal
  ) {
    this.createSocialMediaForm();
    this.createPermissionForm();
    this.createModal();
  }

  public item: any;
  createSocialMediaForm() {
    this.socialMediaForm = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      iconUrl: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
  }

  createPermissionForm() {}

  updateSocialMedia(event: any) {
    this.socialMedia = {
      title: this.socialMediaForm.controls.title.value,
      link: this.socialMediaForm.controls.link.value,
      iconUrl: this.socialMediaForm.controls.iconUrl.value,
      displayOrder: this.socialMediaForm.controls.displayOrder.value,
      id: this.item?.id,
    };
    console.log(this.socialMedia);
    const formData = new FormData();
    formData.append('title', this.socialMedia.title);
    formData.append('link', this.socialMedia.link);
    formData.append('iconUrl', this.socialMedia.iconUrl);
    formData.append('displayOrder', this.socialMedia.displayOrder.toString());

    this.service.update(formData).then((res) => {
      console.log(res);
      this.ngbActiveModal.close();
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = 'Edit Social Media';
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  ngOnInit(): void {}
}
