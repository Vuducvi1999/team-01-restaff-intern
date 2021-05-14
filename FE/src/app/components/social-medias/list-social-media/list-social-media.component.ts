import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { FileService, SweetalertService } from 'src/app/lib/data/services';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
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
    private socialService: SocialMediaService,
    private sweetAlertService: SweetalertService
  ) {
    this.getSocialMedias();
  }

  getSocialMedias() {
    this.socialService
      .get(null)
      .then((res: ReturnMessage<PageModel<SocialMediaModel>>) => {
        if (!res.hasError) {
          this.socialMedias = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
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
        title: 'Image',
        type: 'custom',
        renderComponent: ViewImageCellComponent,
      },
      title: {
        title: 'Title',
      },
      link: {
        title: 'Link',
      },
      displayOrder: {
        title: 'Display Order',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
        filter: false,
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
    this.sweetAlertService
      .confirm('Do you want to permanently delete this item?', 'Yes')
      .then((res) => {
        this.socialService.delete(socialMedia).then(() => {
          this.getSocialMedias();
        });
      });
  }

  ngOnInit(): void {}
}
