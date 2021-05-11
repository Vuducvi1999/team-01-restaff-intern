import { Component, OnInit, Input } from "@angular/core";
import { ReturnMessage } from "src/app/lib/data/models";
import { FooterModel } from "src/app/lib/data/models/footer/footer.model";
import { PageContentModel } from "src/app/lib/data/models/pageContent/pageContent.model";
import { FileService } from "src/app/lib/data/services/files/file.service";
import { FooterService } from "src/app/lib/data/services/footer/footer.service";
import { PageContentService } from "src/app/lib/data/services/pageContent/pageContent.service";

@Component({
  selector: "app-footer-one",
  templateUrl: "./footer-one.component.html",
  styleUrls: ["./footer-one.component.scss"],
  providers: [PageContentService],
})
export class FooterOneComponent implements OnInit {
  @Input() class: string = "footer-light"; // Default class
  @Input() themeLogo: string = "assets/images/icon/logo.png"; // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  public footerModel: FooterModel = {
    socialMedias: [],
    categories: [],
    informationWeb: {address: '', phone: '', email: '', fax: '', logo: '', title: '', description: ''}  
  }
  public socialMediasIcons: any[] = [];
  pageContents: PageContentModel[] = [];

  constructor(
    public footerService: FooterService,
    private pageContentService: PageContentService
  ) {}

  ngOnInit(): void {
    this.sortIcons();
    this.getPageContents();
  }

  async loadFooterModel() {
    await this.footerService.getSocialMedias(null).then((res: any) => {
      this.footerModel.socialMedias = res.data;
    });
    await this.footerService.getCategories(null).then((res: any) => {
      this.footerModel.categories = (res.data);
    })
    await this.footerService.getInformationWeb(null).then((res: any) => {
      this.footerModel.informationWeb = res.data;
    })

  }

  async sortIcons() {
    await this.loadFooterModel();
    this.socialMediasIcons = this.footerModel.socialMedias;
    this.socialMediasIcons.sort((a, b) =>
      a.displayOrder > b.displayOrder ? 1 : -1
    );
  }

  getPageContents() {
    this.pageContentService
      .getList()
      .then((data: ReturnMessage<PageContentModel[]>) => {
        this.pageContents = data.data;
      });
  }

  getIcon(model: any) {
    return FileService.getLinkFile(model);
  }
}
