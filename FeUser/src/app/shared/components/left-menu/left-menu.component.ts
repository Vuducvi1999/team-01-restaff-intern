import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';
import { Menu } from 'src/app/lib/data/models/header/header.model';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, public navServices: NavService) {
    this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems );
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  ngOnInit(): void {
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  onHover(menuItem) {
    if(window.innerWidth > 1200 && menuItem){
       document.getElementById('unset').classList.add('sidebar-unset')
    } else {
      document.getElementById('unset').classList.remove('sidebar-unset')
    }
  }

}
