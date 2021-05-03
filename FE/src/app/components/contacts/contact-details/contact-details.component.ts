import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
import { ContactModel } from 'src/app/lib/data/models/contact/contact.model';
import { ContactService } from 'src/app/lib/data/services/contacts/contact.service';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  providers: [ContactService],
})
export class ContactDetailComponent implements OnInit {
  public pageContentForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public contact: ContactModel;
  @Input() item;

  public editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder,
    private pageContentService: ContactService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.pageContentForm = this.formBuilder.group({
      firstName: [this.item ? this.item.firstName : ''],
      lastName: [this.item ? this.item.lastName : ''],
      email: [this.item ? this.item.email : ''],
      phoneNumber: [this.item ? this.item.phoneNumber : ''],
      message: [this.item ? this.item.message : ''],
      status: [this.item ? this.item.status : ''],
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

    this.contact = {
      id: this.item ? this.item.id : '',
      firstName: this.pageContentForm.value.firstName,
      lastName: this.pageContentForm.value.lastName,
      email: this.pageContentForm.value.email,
      phoneNumber: this.pageContentForm.value.phoneNumber,
      message: this.pageContentForm.value.message,
      status: this.pageContentForm.value.status,
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.pageContentService
      .save(this.contact)
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
}
