import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { OrderDetailModel, OrderModel } from 'src/app/lib/data/models/orders/order.model';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { OrderDetailsService } from 'src/app/lib/data/services/orders/order-details.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-list-order-details',
  templateUrl: './list-order-details.component.html',
  styleUrls: ['./list-order-details.component.scss'],
  providers: [OrderDetailsService],
})
export class ListOrderDetailsComponent implements OnInit {
  public orderForm: FormGroup;
  public item: any;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public orderDetails: OrderDetailModel[];


  constructor(
    private ngbActiveModal: NgbActiveModal,
    private orderDetailsService: OrderDetailsService
  ) {
  }
  public settings = {
    mode: 'external',
    actions: false,
    columns: {
      productName: {
        title: 'Product Name',
      },
      productId: {
        title: 'Product Id',
      },
      price: {
        title: 'Price',
      },
      quantity: {
        title: 'Quantity',
      }
      ,
      totalAmount: {
        title: 'Total Amount',
      }
    },
  };

  ngOnInit() {
    this.getOrderDetails();
    this.createModal();
  }

  getOrderDetails() {
    this.orderDetailsService.getByOrder(this.item.id, null).then((res: ReturnMessage<OrderDetailModel[]>) => {
      if (!res.hasError) {
        this.orderDetails = res.data;
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
