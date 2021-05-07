import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonConnectionOptions } from "node:tls";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import {
  CommentModel,
  CommentPassingModel,
} from "src/app/lib/data/models/comments/comment.model";
import { ReturnMessage } from "src/app/lib/data/models/common";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { FileService } from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { TypeDisplayImage } from "src/app/shared/data";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  providers: [CommentService],
})
export class BlogDetailComponent implements OnInit {
  id: string;
  data: BlogModel;
  dataComment: CommentPassingModel;
  typeDisplayImage = TypeDisplayImage;
  user: UserDataReturnDTOModel;
  comments: CommentModel[] = [];

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.getBlog();
    this.initDataComment();
    this.getComments();
  }

  getBlog() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.blogService
        .getBlog(this.id)
        .then((res: ReturnMessage<BlogModel>) => {
          this.data = res.data;
        });
    });
  }

  async getComments() {
    try {
      const data: ReturnMessage<
        CommentModel[]
      > = await this.commentService.getAll();
      this.comments = data.data;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  getImage(image) {
    return FileService.getLinkFile(image);
  }

  initDataComment() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.dataComment = {
      fullName: this.user ? this.user.firstName + " " + this.user.lastName : "",
      customerId: this.user ? this.user.id : "",
      entityId: this.activatedRoute.snapshot.paramMap.get("id"),
      entityType: "Blog",
    };
  }
}
