import { Component, OnInit } from "@angular/core";
import { BlogModel } from "src/app/lib/data/model/blogs/blog.model";
import { PageModel, ReturnMessage } from "src/app/lib/data/model/common";
import { BlogService } from "src/app/lib/data/services";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  public blogs: BlogModel[];

  // constructor() {}

  constructor(private blogService: BlogService) {
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
  ngOnInit() {}
}
