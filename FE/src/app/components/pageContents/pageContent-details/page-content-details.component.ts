import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageContentModel } from 'src/app/lib/data/models/pageContent/pageContent.model';
import { PageContentService } from 'src/app/lib/data/services/pageContents/pageContent.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
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
  @Input() item;

  public editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder,
    private pageContentService: PageContentService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.pageContentForm = this.formBuilder.group({
      title: [this.item ? this.item.title : ''],
      shortDes: [this.item ? this.item.shortDes : ''],
      description: [this.item ? this.item.description : ''],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `Update` : `Add`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save() {
    if (this.pageContentForm.invalid) {
      console.log(this.pageContentForm);
      return;
    }

    this.pageContent = {
      id: this.item ? this.item.id : '',
      title: this.pageContentForm.value.title.trim(),
      description: this.pageContentForm.value.description,
      shortDes: this.pageContentForm.value.shortDes.trim(),
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.pageContentService
      .update(this.pageContent)
      .then(() => {
        this.ngbActiveModal.close();
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  hideLabelDes = false;
}
