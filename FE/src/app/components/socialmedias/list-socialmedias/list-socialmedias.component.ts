import { Component, OnInit } from '@angular/core';
import { SocialMediaModel } from '../../../lib/data/models/socialmedias/socialmedia.model';

@Component({
  selector: 'app-list-socialmedias',
  templateUrl: './list-socialmedias.component.html',
  styleUrls: ['./list-socialmedias.component.scss'],
})
export class ListSocialMediasComponent implements OnInit {
  public socialmedias: SocialMediaModel[] = [];

  constructor() {
    // this.socialmedias =
  }

  public settings = {
    action: {
      position: 'right',
    },
    columms: {
      title: {
        title: 'Title',
      },
      link: {
        title: 'Link',
      },
      iconUrl: {
        title: 'Icon Url',
      },
      displayOrder: {
        title: 'Display Order',
      },
    },
  };
  ngOnInit(): void {}
}
