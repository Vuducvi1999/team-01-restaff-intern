import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { CommentPassingModel } from "src/app/lib/data/models/comments/comment.model";
import { ReturnMessage } from "src/app/lib/data/models/common";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { FileService } from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";
import { TypeDisplayImage } from "src/app/shared/data";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
})
export class BlogDetailComponent implements OnInit {
  id: string;
  data: BlogModel;
  dataComment: CommentPassingModel;
  typeDisplayImage = TypeDisplayImage;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getBlog();
  }

  ngOnInit() {
    this.initDataComment();
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

  getImage(image) {
    return FileService.getLinkFile(image);
  }

  initDataComment() {
    const user: UserDataReturnDTOModel = JSON.parse(
      localStorage.getItem("user")
    );

    this.dataComment = {
      fullName: user ? user.firstName + " " + user.lastName : "",
      customerId: user ? user.id : "",
      entityId: this.activatedRoute.snapshot.paramMap.get("id"),
      entityType: "Blog",
    };
  }
}
