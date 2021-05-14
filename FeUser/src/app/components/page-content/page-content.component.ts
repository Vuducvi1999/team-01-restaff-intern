import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReturnMessage } from "src/app/lib/data/models";
import {
  PageContentInfoModel,
  PageContentModel,
} from "src/app/lib/data/models/pageContent/pageContent.model";
import { PageContentService } from "src/app/lib/data/services/pageContent/pageContent.service";

@Component({
  selector: "app-page-content",
  templateUrl: "./page-content.component.html",
  providers: [PageContentService],
})
export class PageContentComponent implements OnInit {
  pageContent: PageContentModel;
  isContactUs: boolean;

  constructor(
    public pageContentService: PageContentService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      this.getCurrentPageContent();
    });
    this.getCurrentPageContent();
  }

  getCurrentPageContent() {
    const id = this.activeRoute.snapshot.paramMap.get("id");
    this.isContactUs = id === "00000000-0000-0000-0000-000000000002";

    this.pageContentService
      .getById(null, id)
      .then((data: ReturnMessage<PageContentModel>) => {
        this.pageContent = data.data;
      });
  }
}
