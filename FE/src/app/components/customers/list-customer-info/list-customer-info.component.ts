import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerInfoModel, PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CustomerInfoService } from 'src/app/lib/data/services';
import { CustomerInfoDetailsComponent } from '../customer-info-details/customer-info-details.component';

@Component({
  selector: 'app-list-customer-info',
  templateUrl: './list-customer-info.component.html',
  styleUrls: ['./list-customer-info.component.scss'],
  providers: [CustomerInfoService],
})
export class ListCustomerInfoComponent implements OnInit {
  public users: CustomerInfoModel[];
  closeResult = '';
  constructor(private modalService: NgbModal, private customerInfoService: CustomerInfoService) {
    this.getList();
  }
  ngOnInit(): void {}

  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      username: {
        title: 'Username',
      },
      email: {
        title: 'Email',
      },
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name',
      },
      address: {
        title: 'Address',
      },
      phone: {
        title: 'Phone',
      },
      type: {
        title: 'Type',
        valuePrepareFunction: (t) => {
          if(t == 0)
          {
            return "Customer";
          }
          if(t == 1)
          {
            return "Admin";
          }
        }
      }
    },
  };

  delete(event: any) {
    let category = event.data as CustomerInfoModel;
    if (window.confirm('Are u sure?')) {
      this.customerInfoService.delete(category).then(() => {
        this.getList();
      });
    }
  }

  openPopup(item: any) {
    var modalRef = this.modalService.open(CustomerInfoDetailsComponent, {
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
    this.customerInfoService
      .get(null)
      .then((res: ReturnMessage<PageModel<CustomerInfoModel>>) => {
        if (!res.hasError) {
          this.users = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }
}
