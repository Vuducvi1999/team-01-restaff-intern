import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileDtoModel } from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { FileService } from 'src/app/lib/data/services';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-social-media-detail',
  templateUrl: './social-media-detail.component.html',
  styleUrls: ['./social-media-detail.component.scss'],
})
export class SocialMediaDetailComponent implements OnInit {
  public socialMediaForm: FormGroup;
  public socialMedia: SocialMediaModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public item: any;
  submitted = false;

  public modalFile: ModalFile;
  public fileURL : (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private socialService: SocialMediaService
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.SOCIALMEDIA;
  }

  loadItemForm() {
    this.socialMediaForm = this.formBuilder.group({
      title: [this.item ? this.item.title : '', Validators.required],
      link: [this.item ? this.item.link : '', Validators.required],
      iconUrl: [this.item ? this.item.iconUrl : '', Validators.required],
      displayOrder: [
        this.item ? this.item.displayOrder : '',
        Validators.required,
      ],
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.item != null ? `Update ${this.item.title}` : `Add Social Media`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  saveSocialMedia(event: any) {
    this.socialMedia = {
      title: this.socialMediaForm.controls.title.value,
      link: this.socialMediaForm.controls.link.value,
      iconUrl: this.socialMediaForm.controls.iconUrl.value,
      displayOrder: this.socialMediaForm.controls.displayOrder.value,
      id: this.item ? this.item.id : '',
      files: this.modalFile.listFile,
    };
    console.log(this.socialMedia);
    this.submitted = true;
    if (this.socialMediaForm.valid) {
      if (this.item) {
        return this.socialService
          .update(this.socialMedia)
          .then((res) => {
            this.socialMediaForm.reset();
            this.submitted = false;
            this.ngbActiveModal.close();
          })
          .catch((er) => {
            if (er.error.hasError) {
              console.log(er.error.message);
            }
          });
      }

      return this.socialService
        .create(this.socialMedia)
        .then((res) => {
          this.socialMediaForm.reset();
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
  get SocialMediaFormControl() {
    return this.socialMediaForm.controls;
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
  ngOnInit(): void {
    this.loadItemForm();
    this.createModal();
    
    if(this.item)
    {
      this.fileURL = [];
      this.fileURL.push(FileService.getLinkFile(this.item.iconUrl));
    }
  }

  onChangeData(event: FileDtoModel[]) {
    if (event || event.length > 0) {
      this.fileURL = null;
      this.socialMediaForm.controls.iconUrl.setValue(event[0].url);
    }
  }
}
