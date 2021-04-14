import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import { CreateSocialMediaComponent } from '../create-social-media/create-social-media.component';

@Component({
  selector: 'app-list-social-media',
  templateUrl: './list-social-media.component.html',
  styleUrls: ['./list-social-media.component.scss'],
})
export class ListSocialMediaComponent implements OnInit {
  public socialMedias = [];
  public id: string = '';

  constructor(
    private modalService: NgbModal,
    private service: SocialMediaService
  ) {
    this.getSocialMedias();
  }

  getSocialMedias() {
    this.service
      .get(null)
      .then((res: ReturnMessage<PageModel<SocialMediaModel>>) => {
        if (!res.hasError) {
          console.log('social media', res.data);
          this.socialMedias = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  public settings = {
    mode: 'external',
    action: {
      position: 'right',
    },
    columns: {
      vendor: {
        title: 'Social Media',
        type: 'html',
      },
      title: {
        title: 'Title',
      },
      link: {
        title: 'Link',
      },
      iconUrl: {
        title: 'Icon URL',
      },
      displayOrder: {
        title: 'Display Order',
      },
    },
  };

  open(event: any) {
    var modalRef = this.modalService.open(CreateSocialMediaComponent, {
      size: 'lg',
    });
    if (event == null) {
      modalRef.componentInstance.data = event;
    } else {
      modalRef.componentInstance.data = event.data;
    }
    modalRef.result.then(() => this.getSocialMedias());
  }

  delete(event: any) {
    let socialMedia = event.data as SocialMediaModel;
    if (window.confirm('Are you sure to delete?')) {
      this.service.delete(socialMedia).then(() => {
        this.getSocialMedias();
      });
    }
  }

  ngOnInit(): void {}
}
