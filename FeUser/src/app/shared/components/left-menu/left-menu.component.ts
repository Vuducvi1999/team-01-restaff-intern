import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderModel, Menu } from "src/app/lib/data/models/header/header.model";
import { HeaderService } from "src/app/lib/data/services";

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"],
})
export class LeftMenuComponent implements OnInit {
  public menuItems: Menu[] = [];
  public leftMenu: boolean = false;
  @Input() public headerModel: HeaderModel;
  event: any = {};
  constructor(public headerService: HeaderService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  leftMenuToggle(): void {
    this.leftMenu = !this.leftMenu;
  }


  async loadMenu() {
    this.headerModel?.categories.forEach((item) => {
      this.menuItems.push({
        title: item.name,
        path: `/product?search.categoryName=${item.name}`,
        type: "link",
      });
    });
  }
  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  onHover(menuItem) {
    if (window.innerWidth > 1200 && menuItem) {
      document.getElementById("unset").classList.add("sidebar-unset");
    } else {
      document.getElementById("unset").classList.remove("sidebar-unset");
    }
  }
  loadUrlNavaigate(url: string) {
    this.router.navigateByUrl(url);
    this.leftMenuToggle();
  }

  bigImg(event) {
    this.event["font-weight"] = event["font-weight"];

    event["font-weight"] = "bold";
  }

  normalImg(event) {
    if (this.event) {
      event["font-weight"] = this.event["font-weight"];
    }
  }
}
