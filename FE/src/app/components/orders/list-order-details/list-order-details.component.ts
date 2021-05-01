import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { OrderModel } from 'src/app/lib/data/models/orders/order.model';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-list-order-details',
  templateUrl: './list-order-details.component.html',
  styleUrls: ['./list-order-details.component.scss'],
  providers: [OrdersService],
})
export class ListOrderDetailsComponent implements OnInit {
  public orderForm: FormGroup;
  public item: any;
  public order = new OrderModel();
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public orders: OrderModel[];

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ordersService: OrdersService
  ) {

  }

  public settings = {

    mode: 'external',
    actions: {
      position: 'right',
      add: false,
      delete: false,
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
      }

    },
  };

  ngOnInit() {
    this.getOrders();
    this.createModal();
  }

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
  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      `Order Details List`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Back';
  }


  close(event: any) {
    this.ngbActiveModal.close();
  }
}
