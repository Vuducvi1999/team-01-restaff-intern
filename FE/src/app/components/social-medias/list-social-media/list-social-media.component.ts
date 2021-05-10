import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { FileService } from 'src/app/lib/data/services';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import { SocialMediaDetailComponent } from '../social-media-detail/social-media-detail.component';

@Component({
  selector: 'app-list-social-media',
  templateUrl: './list-social-media.component.html',
  styleUrls: ['./list-social-media.component.scss'],
})
export class ListSocialMediaComponent implements OnInit {
  public socialMedias: SocialMediaModel[];

  constructor(
    private modalService: NgbModal,
    private socialService: SocialMediaService
  ) {
    this.getSocialMedias();
  }

  getSocialMedias() {
    this.socialService
      .get(null)
      .then((res: ReturnMessage<PageModel<SocialMediaModel>>) => {
        if (!res.hasError) {
          // console.log('social media', res.data);
          this.socialMedias = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          // console.log(er.error.message);
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
      iconUrl: {
        title: 'ImageURL',
        type: 'html',
        filter: false,
        valuePrepareFunction: (file) => {
          var fileExt = file.split('.').pop();
          if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'icon'
          ) {
            return `<a href="${FileService.getLinkFile(file)}"><img width="75px" height="75px" src="${FileService.getLinkFile(file)}"/></a>`;
          }
          return `<a href="${FileService.getLinkFile(file)}">${FileService.getLinkFile(file)}</a>`;
        },
      },
      title: {
        title: 'Title',
      },
      link: {
        title: 'Link',
      },
      displayOrder: {
        title: 'Display Order',
      },
    },
  };

  open(event: any) {
    var modalRef = this.modalService.open(SocialMediaDetailComponent, {
      size: 'lg',
    });
    if (event) {
      modalRef.componentInstance.item = event?.data;
    }
    modalRef.result.then(() => this.getSocialMedias());
  }

  delete(event: any) {
    let socialMedia = event.data as SocialMediaModel;
    if (window.confirm('Are you sure to delete?')) {
      this.socialService.delete(socialMedia).then(() => {
        this.getSocialMedias();
      });
    }
  }

  ngOnInit(): void {}
}
