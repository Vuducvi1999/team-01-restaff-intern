import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageContentModel } from 'src/app/lib/data/models/pageContent/pageContent.model';
import { PageContentService } from 'src/app/lib/data/services/pageContents/pageContent.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { TypeSweetAlertIcon } from 'src/app/lib/data/models';
@Component({
  selector: 'app-page-content-details',
  templateUrl: './page-content-details.component.html',
  styleUrls: ['./page-content-details.component.scss'],
  providers: [PageContentService],
})
export class PageContentDetailComponent implements OnInit {
  public pageContentForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public pageContent: PageContentModel;
  public modalFile: ModalFile;
  public fileURL: (string | ArrayBuffer)[];
  submitted = false;
  @Input() item;

  public editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder,
    private pageContentService: PageContentService,
    private ngbActiveModal: NgbActiveModal,
    private messageService: MessageService
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.BANNER;
  }

  ngOnInit() {
    this.loadItem();
    if (this.item.imageUrl) {
      this.fileURL = [];
      this.item.imageUrl.split(',').forEach((it) => {
        this.fileURL.push(it);
      });
    }
  }

  loadItem() {
    this.pageContentForm = this.formBuilder.group({
      title: [this.item ? this.item.title : ''],
      shortDes: [this.item ? this.item.shortDes : ''],
      imageUrl: [this.item ? this.item.imageUrl : '', Validators.required],
      description: [this.item ? this.item.description : ''],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `Update` : `Add`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  get pageContentFormControl() {
    return this.pageContentForm.controls;
  }

  save() {
    this.submitted = true;

    this.pageContent = {
      id: this.item ? this.item.id : '',
      title: this.pageContentForm.value.title.trim(),
      description: this.pageContentForm.value.description,
      imageUrl: this.pageContentForm.controls.imageUrl.value,
      shortDes: this.pageContentForm.value.shortDes.trim(),
      files: this.modalFile.listFile,
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.pageContentService
      .update(this.pageContent)
      .then(() => {
        if (this.item) {
          this.messageService.notification(
            'Page content has been edited',
            TypeSweetAlertIcon.SUCCESS
          );
        }
        this.ngbActiveModal.close();
        this.submitted = false;
      })
      .catch((er) => {
        this.messageService.alert(
          er.error.message ??
          JSON.stringify(er.error.error) ??
          'Server Disconnected',
          TypeSweetAlertIcon.ERROR
        );
      });
  }

  close(event: any) {
    this.ngbActiveModal.dismiss();
  }

  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if (!this.fileURL) {
      this.fileURL = [];
    }
    if (event.add) {
      this.fileURL = [...this.fileURL, ...event.add];
    }
    if (event.remove) {
      this.fileURL.forEach((e: string, i) => {
        if (e.includes(event.remove)) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if (event.removeAll) {
      this.fileURL = [];
    }

    this.pageContentForm.controls.imageUrl.setValue(this.fileURL.join(','));
  }
}
