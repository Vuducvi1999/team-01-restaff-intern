import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnMessage, PageModel } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { CustomerService, FileService } from 'src/app/lib/data/services';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [CustomerService]
})
export class ListCustomersComponent implements OnInit {
public users: UserModel[];
  closeResult = '';
  constructor(private modalService: NgbModal, private customerService: CustomerService) {
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
        title: 'ImageURL',
        type: 'html',
        filter: false,
        valuePrepareFunction: (file) => {
          if(file == null)
          {
            return;
          }
          var fileExt = file.split('.').pop();
          if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'icon'
          ) {
            return `<a href="${FileService.getLinkFile(file)}"><img width="75px" height="75px" src="${FileService.getLinkFile(file)}"/></a>`;
          }
          return `<a href="${FileService.getLinkFile(file)}">${FileService.getLinkFile(file)}</a>`;
        },
      },
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
    },
  };

  delete(event: any) {
    let category = event.data as UserModel;
    if (window.confirm('Are u sure?')) {
      this.customerService.delete(category).then(() => {
        this.getList();
      });
    }
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
      .then((res: ReturnMessage<PageModel<UserModel>>) => {
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
