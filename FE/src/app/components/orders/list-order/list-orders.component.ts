import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage, TypeSweetAlertIcon } from 'src/app/lib/data/models';
import {
  OrderDetailModel,
  OrderModel,
} from 'src/app/lib/data/models/orders/order.model';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import { CustomViewCellNumberComponent } from 'src/app/shared/components/custom-view-cell-number/custom-view-cell-number.component';
import { UpdateOrderComponent } from '../update-order/update-order.component';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
  providers: [OrdersService, DatePipe],
})
export class ListOrdersComponent implements OnInit {
  public orders: OrderModel[];
  public filter: string = '';

  constructor(
    private modalService: NgbModal,
    private ordersService: OrdersService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {
    this.getOrders();
  }
  ngOnInit() {}
  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
      add: false,
      delete: false,
    },
    columns: {
      code: {
        title: 'Code',
      },
      createByDate: {
        title: 'Created by Date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy HH:mm:ss');
          return formatted;
        },
      },
      fullName: {
        title: 'Full Name',
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
      note: {
        title: 'Note',
      },
      hasCoupon: {
        title: 'Coupon Applied',
        valuePrepareFunction: (cell, row) => {
          return cell ? row.couponName : '';
        },
      },
      totalAmount: {
        title: 'Total Amount',
        value: 'totalAmount',
        type: 'custom',
        renderComponent: CustomViewCellNumberComponent,
      },
    },
  };

  getOrders() {
    this.ordersService
      .get(null)
      .then((res: ReturnMessage<PageModel<OrderModel>>) => {
        if (!res.hasError) {
          this.orders = res.data.results;
          this.orders.forEach((order) => {
            order.hasCoupon = false;
            if (order.couponCode) {
              order.hasCoupon = true;
            }
          });
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  openUpdate(event: any) {
    var modalRef = this.modalService.open(UpdateOrderComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getOrders(),(dismiss)=>{});
  }

  statusFilter(status: string) {
    if (this.filter == status) {
      this.filter = '';
      return this.getOrders();
    }
    this.filter = status;
    this.ordersService
      .getByStatus(null, status)
      .then((response) => {
        this.orders = response.data;
        this.orders.forEach((order) => {
          order.hasCoupon = false;
          if (order.couponCode) {
            order.hasCoupon = true;
          }
        });
      })
      .catch((er) => {
        this.messageService.alert(
          er.error.message ??
            JSON.stringify(er.error.error) ??
            'Server Disconnected',
          TypeSweetAlertIcon.ERROR
        );
        // if (er.error.hasError) {
        //   console.log(er.error.message)
        // }
      });
  }
}
