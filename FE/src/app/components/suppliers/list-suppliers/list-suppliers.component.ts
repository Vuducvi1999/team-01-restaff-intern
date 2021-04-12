import { Component, OnInit } from '@angular/core';
import { suppliersDB } from '../../../shared/tables/vendor-list';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.scss']
})
export class ListSuppliersComponent implements OnInit {
  public suppliers = [];

  constructor() {
    this.suppliers = suppliersDB.data;
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      vendor: {
        title: 'Supplier',
        type: 'html',
      },
      products: {
        title: 'Products'
      },
      store_name: {
        title: 'Store Name'
      },
      date: {
        title: 'Date'
      },
      balance: {
        title: 'Wallet Balance',
      },
      revenue: {
        title: 'Revenue',
      }
    },
  };

  ngOnInit() {
  }

}
