import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { OrderDetailModel, OrderModel } from 'src/app/lib/data/models/orders/order.model';
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
      add: false,
      delete: false,
    },
    columns: {
      code: {
        title: 'Code',
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
        filter:{
          type:'list',
          config: {
            list: [
              { value: 'New', title: 'New' },
              { value: 'Approved', title: 'Approved' },
              { value: 'Rejected', title: 'Rejected' },
            ],
          },
          sort:'true',
        },
      },
      note: {
        title: 'Note',
      },
      hasCoupon:{
        title:'Coupon Applied'
      },
      totalItem: {
        title: 'Total Item',
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'text',
        valuePrepareFunction: (row) => {
          var price = (row).toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          });
          return `${price}`;
        }
      },
    }
  };

  getOrders() {
    this.ordersService.get(null).then((res: ReturnMessage<PageModel<OrderModel>>) => {
      if (!res.hasError) {
        this.orders = res.data.results;
        this.orders.forEach(order=>{
          order.hasCoupon=false;
          if(order.couponCode){
            order.hasCoupon =true;
          }
        })
      }
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });

  }

  openUpdate(event: any) {
    var modalRef = this.modalService.open(UpdateOrderComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getOrders());
  }


}
