import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { OrderModel } from 'src/app/lib/data/models/orders/order.model';
import { FileService } from 'src/app/lib/data/services';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import { UpdateOrderComponent } from '../update-order/update-order.component';



@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
  providers: [OrdersService]
})
export class ListOrdersComponent implements OnInit {
  public orders: OrderModel[];

  constructor(private modalService: NgbModal, private ordersService: OrdersService) {
    this.getOrders();
  }
  ngOnInit() {
  }
  public settings = {

    mode: 'external',
    actions: {
      position: 'right',
      add:false,
      delete:false,
    },
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
        this.orders = res.data.results;
        console.log("order", this.orders);

      }
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });

  }

  openDetails(event: any) {
    var modalRef = this.modalService.open(UpdateOrderComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getOrders());
  }

}
