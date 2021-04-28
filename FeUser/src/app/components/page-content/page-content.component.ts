import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReturnMessage } from "src/app/lib/data/models";
import { PageContentModel } from "src/app/lib/data/models/pageContent/pageContent.model";
import { PageContentService } from "src/app/lib/data/services/pageContent/pageContent.service";

@Component({
  selector: "app-page-content",
  templateUrl: "./page-content.component.html",
  providers: [PageContentService],
})
export class PageContentComponent implements OnInit {
  public pageContent: PageContentModel;

  constructor(
    public pageContentService: PageContentService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentPageContent();
    this.activeRoute.params.subscribe(() => {
      this.getCurrentPageContent();
    });
  }

  getCurrentPageContent() {
    const id = this.activeRoute.snapshot.paramMap.get("id");
    this.pageContentService
      .getById(null, id)
      .then((data: ReturnMessage<PageContentModel>) => {
        this.pageContent = data.data;
        const element = document.getElementById("convert-to-html");
        element.innerHTML = data.data.description;
      });
  }
}
