import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataReturnDTOModel } from 'src/app/lib/data/models/users/user.model';

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
  
  public stick: boolean = false;
  public user: UserDataReturnDTOModel;
  loadUrlNavaigate(url: string)
  {
    this.router.navigateByUrl(url);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user'))
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
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

}
