import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogModel } from 'src/app/lib/data/models/blogs/blog.model';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models/common';
import { BlogService } from 'src/app/lib/data/services/blogs/blog.service';
import { BlogsDetailComponent } from '../blogs-detail/blogs-detail.component';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
})
export class ListBlogsComponent implements OnInit {
  public blogs: BlogModel[];

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService
  ) {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService
      .get(null)
      .then((res: ReturnMessage<PageModel<BlogModel>>) => {
        if (!res.hasError) {
          this.blogs = res.data.results;
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
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      position: 'right',
    },
    columns: {
      title: {
        title: 'Title',
      },
      shortDes: {
        title: 'Short Description',
      },
      contentHTML: {
        title: 'Content HTML',
      },
      imageUrl: {
        title: 'Image URL',
      },
    },
  };

  openDetails(event: any) {
    var modalRef = this.modalService.open(BlogsDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(() => this.getBlogs());
  }

  delete(event: any) {
    console.log(event);
    let banner = event.data as BlogModel;
    if (window.confirm('Do you want to permanently delete this item?')) {
      this.blogService.delete(banner).then(() => {
        this.getBlogs();
      });
    }
  }

  ngOnInit() {}
}
