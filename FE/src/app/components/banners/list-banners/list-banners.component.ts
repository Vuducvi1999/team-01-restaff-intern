import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';

import { BannersService } from 'src/app/lib/data/services/banners/banners.service';

import { BannersDetailComponent } from '../banners-detail/banners-detail.component';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss'],
  providers: []
})
export class ListBannersComponent implements OnInit {
  public banners: BannerModel[];

  constructor(private modalService: NgbModal, private bannersService: BannersService) {
    this.getBanners();
  }
  ngOnInit() {
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
      vendor: {
        title: 'Banner',
        type: 'html',
      },
      title: {
        title: 'Title'
      },
      description: {
        title: 'Description'
      },
      link: {
        title: 'Link'
      },
      imageUrl: {
        title: 'Image URL',
      },
      displayOrder: {
        title: 'Display Order',
      }
    },
  };

  getBanners() {
    this.bannersService.get(null).then((res: ReturnMessage<PageModel<BannerModel>>) => {
      if (!res.hasError) {
        this.banners = res.data.results;
        console.log("banner", this.banners);

      }
    }).catch((er) => {

      if (er.error.hasError) {
        console.log(er.error.message)
      }
    });

  }
  openCreate(event: any) {
    var modalRef = this.modalService.open(BannersDetailComponent, {
      size: 'lg'
    });
    modalRef.result.then(() => this.getBanners());
  }

  delete(event: any) {
    console.log(event);
    let banner = event.data as BannerModel;
    if (window.confirm("Are u sure?")) {
      this.bannersService.delete(banner).then(res => {
        this.getBanners();
      });
    }
  }
  openUpdate(event: any) {
    console.log(event.data);
    var modalRef = this.modalService.open(BannersDetailComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getBanners());
  }


}

