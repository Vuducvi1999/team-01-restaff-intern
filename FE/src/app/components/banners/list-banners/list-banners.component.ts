import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBannersComponent } from '../create-banners/create-banners.component';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss']
})
export class ListBannersComponent implements OnInit {
  public banners = [];

  constructor(private modalService: NgbModal) { }


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

