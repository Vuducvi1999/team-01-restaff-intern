import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { OrderDetailModel, OrderModel } from 'src/app/lib/data/models/orders/order.model';
import { FileService } from 'src/app/lib/data/services';
import { OrderDetailsService } from 'src/app/lib/data/services/orders/order-details.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
  providers: [OrdersService, OrderDetailsService],
})
export class UpdateOrderComponent implements OnInit {
  public orderForm: FormGroup;
  public item: any;
  public order = new OrderModel();
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;
  public orderDetails: OrderDetailModel[];


  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ordersService: OrdersService,
    private orderDetailsService: OrderDetailsService

  ) { }


  ngOnInit() {
    this.loadFormItem();
    this.createModal();
    this.getOrderDetails();
  }

  public settings = {
    mode: 'external',
    actions: false,
    columns: {
      productImgUrl: {
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (file) => {
          var fileExt = file.split(',')[0].split('.').pop();
          if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'icon'
          ) {
            return `<a href="${FileService.getLinkFile(file.split(',')[0])}"><img width="75px" height="75px" src="${FileService.getLinkFile(file.split(',')[0])}"/></a>`;
          }
          return `<a href="${FileService.getLinkFile(file.split(',')[0])}">${FileService.getLinkFile(file.split(',')[0])}</a>`;
        },
      },
      productName: {
        title: 'Product Name',
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
        type: 'text',
        valuePrepareFunction: (row) => {
          var price = (row).toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          });
          return `${price}`;
        }
      }
    },
  };

  loadFormItem() {
    var check = this.item.status != "New"
    this.orderForm = this.formBuilder.group({
      fullName: [{ value: this.item.fullName, disabled: check }, Validators.required],
      address: [{ value: this.item.address, disabled: check }, Validators.required],
      email: [{ value: this.item.email, disabled: check }, Validators.required],
      phone: [{ value: this.item.phone, disabled: check }, Validators.required],
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      `Update Order`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.buttons = [
      {
        color: 'btn btn-primary',
        title: 'back',
        onAction: (event: any) => {
          this.ngbActiveModal.close();
        }
      }
    ]
    if (this.item.status == "New") {
      this.modalFooter.buttons = [
        {
          color: 'btn btn-primary',
          title: 'save',
          onAction: (event: any) => {
            this.save("save");
          }
        },
        {
          color: 'btn btn-success',
          title: 'approve',
          onAction: (event: any) => {
            this.save("approve");
          }
        },
        {
          color: 'btn btn-danger',
          title: 'reject',
          onAction: (event: any) => {
            this.save("reject")
          }
        }
      ]
    }
  }

  get orderFormControl() {
    return this.orderForm.controls;
  }

  loadOrderModel() {
    this.order = {
      fullName: this.orderForm.controls.fullName.value,
      address: this.orderForm.controls.address.value,
      email: this.orderForm.controls.email.value,
      phone: this.orderForm.controls.phone.value,
      status: this.item.status,
      id: this.item.id,
      totalAmount: (this.item.totalAmount),
      totalItem: this.item.totalItem

    };
  }
  save(event: any) {
    this.loadOrderModel();

    if (event == "approve") {
      this.order.status = 'Approved';
    }
    if (event == "reject") {
      this.order.status = 'Rejected';
    }

    Swal.fire({
      title: `Do you want to ${event} the order?`,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'question'
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          this.submitted = true;
          if (this.orderForm.valid) {

            if (event == "reject") {
              await Swal.fire({
                title: 'Submit your Github username',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Save',
              }).then((res) => {
                if (res.isConfirmed) {
                  this.order.note = res.value;
                  console.log(this.order.note);
                }
              })
            }

            this.ordersService
              .update(this.order)
              .then((res) => {

                if (event == "approve") {
                  Swal.fire({
                    icon: 'success',
                    title: `Order has been approved`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                }

                if (event == "reject") {
                  Swal.fire({
                    icon: 'success',
                    title: `Order has been rejected`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
                this.ngbActiveModal.close();
              })
              .catch((er) => {
                if (er.error.hasError) {
                  console.log(er.error.message);
                }
              });
          }
        }
      })
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
  close(event: any) {
    this.ngbActiveModal.close();
  }

}
