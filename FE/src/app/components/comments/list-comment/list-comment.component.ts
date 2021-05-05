import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { PageModel } from 'src/app/lib/data/models';
import { CommentModel } from 'src/app/lib/data/models/comments/comment.model';
import { ReturnMessage } from 'src/app/lib/data/models/common/return-message.model';
import { ContactModel } from 'src/app/lib/data/models/contact/contact.model';
import { CommentService } from 'src/app/lib/data/services/comments/comment.service';
import { CommentDetailComponent } from '../comment-detail/comment-details.component';
@Component({
  selector: 'app-list-page-content',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss'],
  providers: [CommentService],
})
export class ListCommentComponent {
  public comments: CommentModel[];

  constructor(private modalService: NgbModal, private service: CommentService) {
    this.getList();
  }

  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      position: 'right',
      edit: false,
    },
    columns: {
      fullName: { title: 'Full Name' },
      customerId: { title: 'Customer Id' },
      entityId: { title: 'Entity Id' },
      entityType: { title: 'Entity Type' },
      content: { title: 'Content' },
    },
  };

  openPopup(item: any) {
    var modalRef = this.modalService.open(CommentDetailComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => {}
    );
  }

  delete(event: any) {
    let comment = event.data as CommentModel;
    if (window.confirm('Are u sure?')) {
      this.service.delete(comment).then(() => {
        this.getList();
      });
    }
  }

  getList() {
    this.service
      .getAll(null)
      .then((res: ReturnMessage<CommentModel[]>) => {
        this.comments = res.data;
        console.log('comment', res.data);
      })
      .catch((er) => {
        if (er) {
          console.log(er);
        }
      });
  }
}
