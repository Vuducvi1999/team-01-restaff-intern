import { Component, OnInit, Input, HostListener } from '@angular/core';
import { HeaderModel, InfoHeaderModel } from 'src/app/lib/data/models';
import { FileService, HeaderService } from 'src/app/lib/data/services';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public headerModel: InfoHeaderModel = {
    informationWeb: {address: '', phone: '', email: '', fax: '', logo: ''}
  }
  public stick: boolean = false;

  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
    this.loadHeaderModel();
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }
  async loadHeaderModel() {
    await this.headerService.getInformationWeb(null).then((res: any) => {
      this.headerModel.informationWeb = res.data;
      console.log(this.headerModel.informationWeb);
    })
  }

  getIcon(model: any) {
    return FileService.getLinkFile(model);
  }
}
