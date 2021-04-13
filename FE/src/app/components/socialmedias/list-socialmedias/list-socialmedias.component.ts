import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnMessage } from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/socialmedias/socialmedia.model';
import { SocialMediaService } from 'src/app/lib/data/services/socialmedia/socialmedia.service';
import { CreateBannersComponent } from '../../banners/create-banners/create-banners.component';

@Component({
  selector: 'app-list-socialmedias',
  templateUrl: './list-socialmedias.component.html',
  styleUrls: ['./list-socialmedias.component.scss'],
  providers: [SocialMediaService],
})
export class ListSocialMediasComponent implements OnInit {
  public socialMedias = [];
  public id: string = '';

  constructor(
    private modalService: NgbModal,
    private service: SocialMediaService
  ) {
    this.service
      .get(null)
      .then((res: ReturnMessage<SocialMediaModel[]>) => {
        if (!res.hasError) {
          console.log('social media', res.data);
          this.socialMedias = res.data;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  public settings = {
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

  openCreate() {
    var modalRef = this.modalService.open(CreateBannersComponent, {
      size: 'lg',
    });
    modalRef.result.then((res) => console.log(res));
  }

  delete(id: any) {
    this.service.delete(id).then(() => {
      this.socialMedias.filter((item) => item.id != id);
    });
  }
  ngOnInit(): void {}
}
