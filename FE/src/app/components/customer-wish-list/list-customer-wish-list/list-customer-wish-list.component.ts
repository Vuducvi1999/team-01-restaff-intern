import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnMessage } from 'src/app/lib/data/models/common/return-message.model';
import { CustomerWishListModel } from 'src/app/lib/data/models/customerWishList/customerWishList.model';
import { CustomerWishListService } from 'src/app/lib/data/services/customerWishLists/customerWishList.service';
import { CustomerWishListDetailComponent } from '../customer-wish-list-detail/customer-wish-list-detail.component';
@Component({
  selector: 'app-list-page-content',
  templateUrl: './list-customer-wish-list.component.html',
  styleUrls: ['./list-customer-wish-list.component.scss'],
  providers: [CustomerWishListService],
})
export class ListCustomerWishListComponent {
  public wishlist: CustomerWishListModel[];

  constructor(
    private modalService: NgbModal,
    private service: CustomerWishListService
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
      edit: false,
    },
    columns: {
      productId: { title: 'Product Id' },
      customerId: { title: 'Customer Id' },
    },
  };

  openPopup(item: any) {
    var modalRef = this.modalService.open(CustomerWishListDetailComponent, {
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

  delete(event: any) {
    let comment = event.data as CustomerWishListModel;
    if (window.confirm('Are u sure?')) {
      this.service.delete(comment).then(() => {
        this.getList();
      });
    }
  }

  getList() {
    this.service
      .getAll(null)
      .then((res: ReturnMessage<CustomerWishListModel[]>) => {
        this.wishlist = res.data;
      })
      .catch((er) => {
        if (er) {
          console.log(er);
        }
      });
  }
}
