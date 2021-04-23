import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "express";
import { BlogService } from "src/app/lib/data/services/blogs/blog.service";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"],
})
export class BlogDetailComponent implements OnInit {
  id: string;
  constructor(
    private blogService: BlogService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    this.blogService.getBlog(this.id).then((data) => console.log(data));
  }

  getBlog() {}
}
