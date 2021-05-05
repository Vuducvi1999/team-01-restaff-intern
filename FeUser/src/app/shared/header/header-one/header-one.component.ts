import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataReturnDTOModel } from 'src/app/lib/data/models/users/user.model';
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
  public user: UserDataReturnDTOModel;
  loadUrlNavaigate(url: string)
  {
    this.router.navigateByUrl(url);
  }

    constructor(private router: Router, public headerService: HeaderService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user'))
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
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

  onLogout()
  {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loadUrlNavaigate('/auth/login');
  }
  async loadHeaderModel() {
    await this.headerService.getInformationWeb(null).then((res: any) => {
      this.headerModel.informationWeb = res.data;
    })
  }

  getIcon(model: any) {
    return FileService.getLinkFile(model);
  }
}
