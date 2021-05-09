import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ReturnMessage } from "src/app/lib/data/models";
import {
  PageContentInfoModel,
  PageContentModel,
} from "src/app/lib/data/models/pageContent/pageContent.model";
import { ContactService } from "src/app/lib/data/services/contacts/contact.service";
import { PageContentService } from "src/app/lib/data/services/pageContent/pageContent.service";

@Component({
  selector: "app-page-info",
  styleUrls: ["./page-info.component.scss"],
  templateUrl: "./page-info.component.html",
  providers: [PageContentService, ContactService],
})
export class PageContentInfoComponent implements OnInit {
  pageContentInfo: PageContentInfoModel;
  contactForm: FormGroup;

  constructor(
    private pageContentService: PageContentService,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getInfo();
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      phoneNumber: [""],
      email: [""],
      message: [""],
    });
  }

  getInfo() {
    this.pageContentService
      .getInfo()
      .then((data: ReturnMessage<PageContentInfoModel>) => {
        this.pageContentInfo = data.data;
      });
  }

  Submit() {
    this.contactService
      .create(this.contactForm.value)
      .then(() => {
        this.initForm();
      })
      .catch((e) => {
        alert(e.error.message);
      });
  }
}
