import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CouponModel } from 'src/app/lib/data/models/coupons/coupon.model';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import { CouponDetailComponent } from '../coupon-detail/coupon-detail.component';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
})
export class ListCouponComponent implements OnInit {
  public coupons: CouponModel[];
  constructor(
    private modalService: NgbModal,
    private couponService: CouponService,
    private datePipe: DatePipe
  ) {
    this.getCoupons();
  }

  getCoupons() {
    this.couponService
      .get(null)
      .then((res: ReturnMessage<PageModel<CouponModel>>) => {
        if (!res.hasError) {
          this.coupons = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }
  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
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
      hasPercent: {
        title: 'Has Percent',
      },
      value: {
        title: 'Value',
      },
      startDate: {
        title: 'Start Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MM yyyy');
        },
      },
      endDate: {
        title: 'End Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MM yyyy');
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
    let coupon = event.data as CouponModel;
    if (window.confirm('Are you sure to delete?')) {
      this.couponService.delete(coupon).then(() => {
        this.getCoupons();
      });
    }
  }
  ngOnInit() {}
}
