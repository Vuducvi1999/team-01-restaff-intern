import { Component, HostListener, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageModel, ReturnMessage } from "src/app/lib/data/models";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { FileService } from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";

@Component({
  selector: "app-blog-main",
  templateUrl: "./blog-main.component.html",
  styleUrls: ["./blog-main.component.scss"],
})
export class BlogMainComponent implements OnInit {
  public blogs: BlogModel[];
  public topBlogs: BlogModel[];
  public recentBlogs: BlogModel[];
  public selectedId: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

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
  getTopBlogs() {
    this.blogService
      .getTop(null)
      .then((res: ReturnMessage<BlogModel[]>) => {
        if (!res.hasError) {
          this.topBlogs = res.data;
          console.log(res.data);
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  getRecentBlogs() {
    this.blogService
      .getRecent(null)
      .then((res: ReturnMessage<BlogModel[]>) => {
        if (!res.hasError) {
          this.recentBlogs = res.data;
          console.log(res);
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }
  ngOnInit() {
    this.getRoute();
    this.getBlogs();
    this.getTopBlogs();
    this.getRecentBlogs();
  }

  getRoute() {
    this.route.queryParams.subscribe((params) => {
      this.selectedId = params["id"];
    });
  }

  getImage(image) {
    return FileService.getLinkFile(image);
  }

  detail() {}
}
