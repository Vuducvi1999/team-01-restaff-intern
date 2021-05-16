import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeSweetAlertIcon } from 'src/app/lib/data/models';
import { ReturnMessage } from 'src/app/lib/data/models/common/return-message.model';
import { ContactModel } from 'src/app/lib/data/models/contact/contact.model';
import { PageContentModel } from 'src/app/lib/data/models/pageContent/pageContent.model';
import { ContactService } from 'src/app/lib/data/services/contacts/contact.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { PageContentService } from 'src/app/lib/data/services/pageContents/pageContent.service';
import { ContactDetailComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-list-page-content',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
  providers: [ContactService],
})
export class ListContactComponent {
  public contacts: ContactModel[];

  constructor(private modalService: NgbModal,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
    this.getList();
  }

  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      position: 'right',
    },
    columns: {
      firstName: { title: 'First Name' },
      lastName: { title: 'Last Name' },
      phoneNumber: { title: 'Phone Number' },
      email: { title: 'Email' },
      message: { title: 'Message' },
      status: { title: 'Status' },
    },
  };

  openPopup(item: any) {
    var modalRef = this.modalService.open(ContactDetailComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    if (!item) modalRef.componentInstance.item = item as PageContentModel;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => { }
    );
  }

  delete(event: any) {
    this.messageService.confirm(`Do you want to delete the category?`, 'Yes').then(res => {
      if (res.isConfirmed) {
        let contact = event.data as ContactModel;
        this.contactService.delete(contact).then(() => {
          this.messageService.notification('Contact has been deleted', TypeSweetAlertIcon.SUCCESS);
          this.getList();
        })
      }
    });
  }

  getList() {
    this.contactService
      .getList(null)
      .then((res: ReturnMessage<ContactModel[]>) => {
        if (!res.hasError) {
          this.contacts = res.data;
          // console.log('contact', res.data);
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          // console.log(er.error.message);
        }
      });
  }
}
