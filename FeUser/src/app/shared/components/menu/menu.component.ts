import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryModel } from "src/app/lib/data/models";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { HeaderModel, Menu } from "src/app/lib/data/models/header/header.model";
import { HeaderService } from "src/app/lib/data/services";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[] = [];
  public mainMenu: boolean = false;

  public headerModel: HeaderModel;
  public categoriesChildren: Menu[] = [];
  public blogsChildren: Menu[] = [];

  constructor(public headerService: HeaderService, private router: Router) {
  }

  ngOnInit() {
    this.loadMenu();
  }

  mainMenuToggle(): void {
    this.mainMenu = !this.mainMenu;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  // async loadHeaderModel() {
  //   await this.headerService.getHeader(null).then((res: any) => {
  //     this.headerModel = res.data;
  //   });
  // }

  async loadMenu() {
    //await this.loadHeaderModel();

    this.headerModel?.categories.forEach((item) => {
      this.categoriesChildren.push({
        title: item.name,
        path: `/product?search.categoryName=${item.name}`,
        type: "link",
      });
    });

    this.headerModel?.blogs.forEach((item) => {
      this.blogsChildren.push({
        title: item.title,
        path: `/blog/${item.id}`,
        type: "link",
      });
    });

    this.menuItems.push(
      { title: "home", type: "link", path: "/home" },
      {
        title: "categories",
        type: "sub",
        active: false,
        children: this.categoriesChildren,
      },
      { title: "products", type: "link", path: "/product" },
      {
        title: "blogs",
        type: "link",
        path: "/blog",
        active: false,
        children: this.blogsChildren,
      }
    );
  }

  loadUrlNavaigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
