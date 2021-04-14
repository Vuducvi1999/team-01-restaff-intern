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
  selector: 'app-social-media-detail',
  templateUrl: './social-media-detail.component.html',
  styleUrls: ['./social-media-detail.component.scss'],
})
export class SocialMediaDetailComponent implements OnInit {
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
    private socialService: SocialMediaService
  ) {}

  loadItemForm() {
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
  }

  createPermissionForm() {}

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.data != null ? `Update ${this.data.title}` : `Add Social Media`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  saveSocialMedia() {
    this.submitted = true;
    this.socialMedia = {
      title: this.socialMediaForm.value.title,
      link: this.socialMediaForm.value.link,
      iconUrl: this.socialMediaForm.value.iconUrl,
      displayOrder: this.socialMediaForm.value.displayOrder,
      id: this.data.id,
    };
    if (this.socialMediaForm.dirty && this.socialMediaForm.invalid) {
      if (this.data) {
        this.socialService.update(this.socialMedia).then(() => {
          this.socialMediaForm.reset();
          this.ngbActiveModal.close();
        });
      } else {
        this.socialService.create(this.socialMedia).then(() => {
          this.socialMediaForm.reset();
          this.ngbActiveModal.close();
        });
      }
    }
  }
  get SocialMediaFormControl() {
    return this.socialMediaForm.controls;
  }
  ngOnInit(): void {
    this.loadItemForm();
  }
}
