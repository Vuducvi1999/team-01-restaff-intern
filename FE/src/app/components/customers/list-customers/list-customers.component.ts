import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ReturnMessage,
  PageModel,
  CustomerModel,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import {
  CustomerService,
  FileService,
  SweetalertService,
} from 'src/app/lib/data/services';
import { ImageComponent } from 'src/app/shared/components/image/image.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [CustomerService],
})
export class ListCustomersComponent implements OnInit {
  public customers: CustomerModel[];
  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private sweetalertService: SweetalertService
  ) {
    this.getList();
  }
  ngOnInit(): void {}

  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      imageUrl: {
        title: 'Image',
        type: 'custom',
        renderComponent: ImageComponent,
      },
      username: {
        title: 'Username',
      },
      email: {
        title: 'Email',
      },
      phone: {
        title: 'Phone',
      },
      address: {
        title: 'Address',
      },
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name',
      },
    },
  };

  delete(event: any) {
    let category = event.data as CustomerModel;
    this.sweetalertService.confirm('Are you sure?', 'Yes').then((it) => {
      if (it.isConfirmed) {
        this.customerService
          .delete(category)
          .then((it: CustomerModel) => {
            this.sweetalertService.notification(
              `Delete Success`,
              TypeSweetAlertIcon.SUCCESS,
              `Item ${it.id}`
            );
            this.getList();
          })
          .catch((er) => {
            this.sweetalertService.notification(
              `Delete Fail`,
              TypeSweetAlertIcon.ERROR,
              er.error.message ?? er.error
            );
          });
      }
    });
  }

  openPopup(item: any) {
    var modalRef = this.modalService.open(CustomerDetailsComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => {}
    );
  }

  getList() {
    this.customerService
      .get(null)
      .then((res: ReturnMessage<PageModel<CustomerModel>>) => {
        if (!res.hasError) {
          this.customers = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          this.sweetalertService.alert(er.error.message??er.error,TypeSweetAlertIcon.ERROR);
        }
      });
  }
}
