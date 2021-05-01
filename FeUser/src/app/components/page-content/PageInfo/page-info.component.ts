import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ReturnMessage } from "src/app/lib/data/models";
import {
  PageContentInfoModel,
  PageContentModel,
} from "src/app/lib/data/models/pageContent/pageContent.model";
import { PageContentService } from "src/app/lib/data/services/pageContent/pageContent.service";

@Component({
  selector: "app-page-info",
  styleUrls: ["./page-info.component.scss"],
  templateUrl: "./page-info.component.html",
  providers: [PageContentService],
})
export class PageContentInfoComponent implements OnInit {
  pageContentInfo: PageContentInfoModel;
  pageContentInfoForm = this.fb.group({
    firstName: [""],
    lastName: [""],
    phoneNumber: [""],
    email: [""],
    message: [""],
  });

  constructor(
    private pageContentService: PageContentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.pageContentService
      .getInfo()
      .then((data: ReturnMessage<PageContentInfoModel>) => {
        this.pageContentInfo = data.data;
        // console.log(data.data);
      });
  }
}
