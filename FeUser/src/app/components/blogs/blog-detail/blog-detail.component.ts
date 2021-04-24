import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { ReturnMessage } from "src/app/lib/data/models/common";
import { FileService } from "src/app/lib/data/services";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"],
})
export class BlogDetailComponent implements OnInit {
  id: string;
  data: BlogModel;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.blogService.getBlog(this.id).then((res: ReturnMessage<BlogModel>) => {
      this.data = res.data;
      console.log(this.data);
    });
  }

  getImage(image) {
    return FileService.getLinkFile(image);
  }
}
