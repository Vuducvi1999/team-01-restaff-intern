import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { FileService } from 'src/app/lib/data/services';

import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
import Swal from 'sweetalert2';

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
    actions: {
      position: 'right',
    },
    columns: {
      imageUrl:{
        title: 'Image',
        type: 'custom',
        renderComponent: ViewImageCellComponent,
      },
      title: {
        title: 'Title',
      },
      description: {
        title: 'Description',
      },
      link: {
        title: 'Link',
      },
      displayOrder: {
        title: 'Display Order',
      },
    },
  };

  getBanners() {
    this.bannersService.get(null).then((res: ReturnMessage<PageModel<BannerModel>>) => {
      if (!res.hasError) {
        this.banners = res.data.results;
        // console.log("banner", this.banners);

      }
    }).catch((er) => {

      if (er.error.hasError) {
        // console.log(er.error.message)
      }
    });

  }

  openDetails(event: any) {
    var modalRef = this.modalService.open(BannersDetailComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getBanners());
  }

  delete(event: any) {
    Swal.fire({
      title: `Do you want to delete the banner?`,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'question'
    }).then(res => {
      if (res.isConfirmed) {
        let banner = event.data as BannerModel;
        this.bannersService.delete(banner).then(() => {
          Swal.fire({
            icon: 'success',
            title: `Banner has been deleted`,
            showConfirmButton: false,
            timer: 1500
          })
          this.getBanners();
        });
      }
    })

  }
}
