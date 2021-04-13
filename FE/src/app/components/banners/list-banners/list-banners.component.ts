import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerDataSource } from 'ng2-smart-table';
import { BannerModel, PageModel, ReturnMessage, SearchPaganationDTO } from 'src/app/lib/data/models';
import { BannersService } from 'src/app/lib/data/services';
import { CreateBannersComponent } from '../create-banners/create-banners.component';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss'],
  providers: []
})
export class ListBannersComponent implements OnInit {
  public banners = [];
  constructor(private modalService: NgbModal, private bannersService: BannersService) {
    this.getBanners();
  }
  source: ServerDataSource;

  public settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   createConfirm: true,
    // },
    mode: 'external',
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
      imageURL: {
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
    var modalRef = this.modalService.open(CreateBannersComponent, {
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


  ngOnInit() {
  }

}

