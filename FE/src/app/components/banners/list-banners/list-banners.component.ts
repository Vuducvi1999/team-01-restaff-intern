import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss']
})
export class ListBannersComponent implements OnInit {
  public banners = [];

  constructor() { }


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

  ngOnInit() {
  }

}

