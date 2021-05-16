import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { PageContentModel } from 'src/app/lib/data/models/pageContent/pageContent.model';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { FileService } from 'src/app/lib/data/services';
import { PageContentService } from 'src/app/lib/data/services/pageContents/pageContent.service';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { UserService } from '../../../lib/data/services/users/user.service';
import { PageContentDetailComponent } from '../pageContent-details/page-content-details.component';

@Component({
  selector: 'app-list-page-content',
  templateUrl: './list-page-content.component.html',
  styleUrls: ['./list-page-content.component.scss'],
  providers: [PageContentService],
})
export class ListPageContentComponent {
  public pageContents: PageContentModel[];

  constructor(
    private modalService: NgbModal,
    private service: PageContentService
  ) {
    this.getList();
  }

  public settings = {
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      position: 'right',
      delete: false,
    },
    columns: {
      title: {
        title: 'Title',
      },
      shortDes: {
        title: 'Short Description',
      },
      order: {
        title: 'Order',
        value: 'order',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  openPopup(item: any) {
    var modalRef = this.modalService.open(PageContentDetailComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    if (!item) modalRef.componentInstance.item = item as PageContentModel;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => {}
    );
  }

  getList() {
    this.service
      .get(null)
      .then((res: ReturnMessage<PageContentModel[]>) => {
        if (!res.hasError) {
          this.pageContents = res.data;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          // console.log(er.error.message);
        }
      });
  }
}
