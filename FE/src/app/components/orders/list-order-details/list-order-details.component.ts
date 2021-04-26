import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { OrderDetailModel } from 'src/app/lib/data/models/orders/order.model';
import { FileService } from 'src/app/lib/data/services';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';



@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
  providers: [OrdersService]
})
export class ListOrderDetailsComponent implements OnInit {
  public orderDetails: OrderDetailModel[];

  constructor(private modalService: NgbModal, private ordersService: OrdersService) {
    this.getOrders();
  }
  ngOnInit() {
  }
  public settings = {

    mode: 'external',
    actions: false,
    columns: {
      fullName: {
        title: 'Full Name',
      },
      code: {
        title: 'Code',
      },
      address: {
        title: 'Address',
      },
      // imageUrl: {
      //   title: 'URL',
      //   type: 'html',
      //   valuePrepareFunction: (file) => {
      //     var fileExt = file.split('.').pop();
      //     if (
      //       fileExt == 'png' ||
      //       fileExt == 'jpg' ||
      //       fileExt == 'jpeg' ||
      //       fileExt == 'icon'
      //     ) {
      //       return `<a href="${FileService.getLinkFile(file)}"><img width="75px" height="75px" src="${FileService.getLinkFile(file)}"/></a>`;
      //     }
      //     return `<a href="${FileService.getLinkFile(file)}">${FileService.getLinkFile(file)}</a>`;
      //   },
      // },
      phone: {
        title: 'Phone',
      },
      email: {
        title: 'Email',
      },
      status: {
        title: 'Status',
      },
      totalAmount: {
        title: 'Total Amount',
      },
      totalItem: {
        title: 'Total Item',
      },
    },
  };

  getOrders() {
    this.ordersService.get(null).then((res: ReturnMessage<PageModel<OrderModel>>) => {
      if (!res.hasError) {
        this.orderDetails = res.data.results;
        console.log("order", this.orderDetails);

      }
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });

  }

  openDetails(event: any) {
    // var modalRef = this.modalService.open(OrdersDetailComponent, {
    //   size: 'lg'
    // });
    // modalRef.componentInstance.item = event?.data;
    // modalRef.result.then(() => this.getOrders());
  }

  // delete(event: any) {
  //   console.log(event);
  //   let order = event.data as OrderModel;
  //   if (window.confirm("Do you want to permanently delete this item?")) {
  //     this.ordersService.delete(order).then(res => {
  //       this.getOrders();
  //     });
  //   }
  // }
}
