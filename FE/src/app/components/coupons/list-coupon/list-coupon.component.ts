import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { CouponModel } from 'src/app/lib/data/models/coupons/coupon.model';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { CouponDetailComponent } from '../coupon-detail/coupon-detail.component';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
})
export class ListCouponComponent implements OnInit {
  public coupons: CouponModel[];
  public data: PageModel<CouponModel>;
  params: any = {};
  constructor(
    private modalService: NgbModal,
    private couponService: CouponService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  getCoupons() {
    this.couponService
      .get({ params: this.params })
      .then((res: ReturnMessage<PageModel<CouponModel>>) => {
        if (!res.hasError) {
          this.coupons = res.data.results;
          this.data = res.data;
        }
      })
      .catch((er) => {});
  }
  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code',
      },
      name: {
        title: 'Name',
      },
      value: {
        title: 'Value',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
        filter: false,
      },
      startDate: {
        title: 'Start Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy');
        },
      },
      endDate: {
        title: 'End Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy');
        },
      },
    },
  };

  open(event: any) {
    var modalRef = this.modalService.open(CouponDetailComponent, {
      size: 'lg',
    });
    if (event) {
      modalRef.componentInstance.item = event?.data;
    }
    modalRef.result.then(() => this.getCoupons());
  }

  delete(event: any) {
    this.messageService
      .confirm(`Do you want to delete the coupon?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let coupon = event.data as CouponModel;
          this.couponService.delete(coupon).then(() => {
            this.messageService.notification(
              'Coupon has been deleted',
              TypeSweetAlertIcon.SUCCESS
            );
            this.getCoupons();
          });
        }
      });
  }
  onPage(event) {
    this.params.pageIndex = event;
    this.getCoupons();
  }
  ngOnInit() {
    this.params.pageIndex = 0;
    this.getCoupons();
  }
}
