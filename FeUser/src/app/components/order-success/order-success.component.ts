import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/lib/data/services';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  providers: []
})
export class OrderSuccessComponent implements OnInit {
  public checkOutOrders: any
  public checkOutOrderDetails: any

  constructor(
    private route: Router,
    private dataRoute: ActivatedRoute,
  ) {

    this.checkOutOrders = this.route.getCurrentNavigation().extras?.state.data;
    this.checkOutOrderDetails = this.checkOutOrders.orderDetails;

  }


  ngOnInit(): void {
  }

  loadData() {

  }
  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

}
