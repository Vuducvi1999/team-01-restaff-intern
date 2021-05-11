import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import {
  CommentModel,
  CommentPassingModel,
  SearchCommentModel,
} from "src/app/lib/data/models/comments/comment.model";
import {
  PageModel,
  ReturnMessage,
  SearchPaganationDTO,
} from "src/app/lib/data/models/common";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, FileService } from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { TypeDisplayImage } from "src/app/shared/data";

@Component({
  selector: "app-blog-detail",
  styleUrls: ["./blog-detail.component.scss"],
  templateUrl: "./blog-detail.component.html",
  providers: [CommentService,AuthService],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  id: string;
  data: BlogModel;
  dataComment: CommentPassingModel;
  typeDisplayImage = TypeDisplayImage;
  user: UserDataReturnDTOModel;
  comments: PageModel<CommentModel>;
  searchModel: SearchPaganationDTO<SearchCommentModel>;

  subDataUser: Subscription;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
  ) {}
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
  }

  ngOnInit() {
    this.subDataUser = this.authService.callUserInfo.subscribe(it => this.user = it);
    this.getBlog();
  }

  getBlog() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.blogService
        .getBlog(this.id)
        .then((res: ReturnMessage<BlogModel>) => {
          this.data = res.data;
        });

      this.createSearchModel();
      this.initDataComment();
      this.getComments();
    });
  }

  createSearchModel() {
    this.searchModel = {
      search: { entityId: this.id },
      pageIndex: 0,
      pageSize: 10,
    };
  }

  changePageIndex(pageIndex: number) {
    this.searchModel = { ...this.searchModel, pageIndex: pageIndex - 1 };

    this.getComments();
  }

  getComments() {
    this.commentService
      .getBlogComments(this.searchModel)
      .then((data: ReturnMessage<PageModel<CommentModel>>) => {
        this.comments = data.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getImage(image) {
    return FileService.getLinkFile(image);
  }

  initDataComment() {
    this.dataComment = {
      fullName: this.user ? this.user.firstName + " " + this.user.lastName : "",
      customerId: this.user ? this.user.id : "",
      entityId: this.activatedRoute.snapshot.paramMap.get("id"),
      entityType: "Blog",
    };
  }
}
