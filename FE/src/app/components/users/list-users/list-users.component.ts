import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { UserDetailComponent } from '../users-details/users-details.component';
import { UserService } from './../../../lib/data/services/users/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [UserService],
})
export class ListUsersComponent implements OnInit {
  public users = [];
  closeResult = '';
  constructor(private modalService: NgbModal, private service: UserService) {
    this.getList();
  }

  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
    },
    columns: {
      username: {
        title: 'Username',
      },
      password: {
        title: 'Password',
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
      imageUrl: {
        title: 'ImageURL',
      },
    },
  };

  delete(event: any) {
    let category = event.data as UserModel;
    if (window.confirm('Are u sure?')) {
      this.service.delete(category).then(() => {
        this.getList();
      });
    }
  }

  openPopup(item: any) {
    if (item) {
      var modalRef = this.modalService.open(UserDetailComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.item = item.data;
      modalRef.result.then(
        (close) => {
          this.getList();
        },
        (dismiss) => {}
      );
    }
    if (!item) {
      var modalRef = this.modalService.open(UserDetailComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.item = item as CategoryModel;
      modalRef.result.then(
        (close) => {
          this.getList();
        },
        (dismiss) => {}
      );
    }
  }

  getList() {
    this.service
      .get(null)
      .then((res: ReturnMessage<PageModel<CategoryModel>>) => {
        console.log('res', res);
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

  ngOnInit() {}
}
