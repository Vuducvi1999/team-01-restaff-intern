import { Component, OnInit, Input } from '@angular/core';
import { FooterModel } from 'src/app/lib/data/models/footer/footer.model';
import { FileService } from 'src/app/lib/data/services/files/file.service';
import { FooterService } from 'src/app/lib/data/services/footer/footer.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/images/icon/logo.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  public footerModel: FooterModel = {
    socialMedias: [],
    categories: []
  }
  public socialMediasIcons: any[] = [];

  constructor(public footerService: FooterService) { }

  ngOnInit(): void {
    this.sortIcons();
  }

  async loadFooterModel() {
    await this.footerService.getSocialMedias(null).then((res: any) => {
      this.footerModel.socialMedias = res.data;
    })
    await this.footerService.getCategories(null).then((res: any) => {
      this.footerModel.categories = (res.data);
    })
  }

  async sortIcons() {
    await this.loadFooterModel();
    this.socialMediasIcons = this.footerModel.socialMedias;
    this.socialMediasIcons.sort((a, b) => (a.displayOrder > b.displayOrder) ? 1 : -1);
  }

  getIcon(model: any) {
    return FileService.getLinkFile(model);
  }


}


