import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnMessage } from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';

import { CreateBannersComponent } from '../create-banners/create-banners.component';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss'],
  providers: [BannersService]
})
export class ListBannersComponent implements OnInit {
  public banners = [];
  constructor(private modalService: NgbModal,private service:BannersService) { 
    this.service.get(null).then((res : ReturnMessage<BannerModel[]>) => {
      if(!res.hasError)
      {
        console.log("banner",res.data);
        this.banners = (res.data as any).results;
      }
    }).catch((er) => {
      
      if(er.error.hasError)
      {
        console.log(er.error.message)
      }
    });
  }


  public settings = {
    actions: {
      position: 'right'
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

  openCreate() {
    var modalRef = this.modalService.open(CreateBannersComponent, {
      size: 'lg'
    });
    modalRef.result.then(res => console.log(res));
  }
  ngOnInit() {
  }

}

