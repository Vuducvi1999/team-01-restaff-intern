import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ETypeSort,
  PageModel,
  ProductModel,
  ReturnMessage,
  SearchPaganationDTO,
} from "src/app/lib/data/models";
import { ProductListService } from "src/app/lib/data/services/productlist/productlist.service";

import { ETypeGridLayout } from "src/app/shared/data";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  providers: [ProductListService],
})
export class ProductListComponent implements OnInit {
  public grid: string = ETypeGridLayout.NORMAL;
  public layoutView: string = "grid-view";
  public products: ProductModel[];
  public pageModel: PageModel<ProductModel>;
  public minPrice: number = 0;
  public maxPrice: number = 5000000;
  public sizePrice: string;
  public tags: any[] = [];
  public category: string = "ALL";
  public paginate: any = {};
  public sortBy: number = ETypeSort.NULL;
  public mobileSidebar: boolean = false;
  public finished: boolean = false;
  public params;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productListService: ProductListService
  ) {
    this.products = [];
    this.params = {};
    this.finished = false;
    console.log(JSON.stringify(this.params));
    this.addItems();
  }

  ngOnInit(): void {}

  addItems() {
    if (this.pageModel?.totalItem == this.products.length) {
      this.finished = true;
      return;
    }

    this.productListService
      .getPageProduct({ params: this.params })
      .then((res: ReturnMessage<PageModel<ProductModel>>) => {
        this.pageModel = res.data;

        this.params.pageIndex = res.data.pageIndex;
        this.params.pageSize = res.data.pageSize;

        this.products = [...this.products, ...res.data.results];
      })
      .catch((res) => console.error(res));
  }

  // Infinite scroll
  public onScroll() {
    // add another items
    this.params.pageIndex++;
    this.addItems();
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    this.resetPage();

    this.params.minPrice = tags.minPrice;
    this.params.maxPrice = tags.maxPrice;

    this.addItems();
  }

  // SortBy Filter
  sortByFilter(value) {
    this.sortBy = value;
    this.resetPage();

    this.params.typeSort = value;

    if (value == ETypeSort.NULL) {
      delete this.params.typeSort;
    }

    this.addItems();
  }

  // // Remove Tag
  removeTag(tag) {
    this.resetPage();
    this.tags = this.tags.filter((val) => val !== tag);
    if (tag == this.category) {
      delete this.params["search.categoryName"];
      this.category = "ALL";
    }

    this.addItems();
  }

  // // Clear Tags
  removeAllTags() {
    this.tags = [];
    this.resetPage();
    delete this.params["search.categoryName"];
    this.category = "ALL";

    this.addItems();
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == "list-view") {
      this.grid = "col-lg-12";
      return;
    }

    // this.grid = "col-xl-3 col-md-6";
    this.grid = ETypeGridLayout.NORMAL;
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  onChangeTypeCate(event: string) {
    this.resetPage();
    this.tags = this.tags.filter((x) => x != this.category);
    this.category = event;

    if (event != "ALL") {
      this.params["search.categoryName"] = event;
      this.tags.push(event);
    }

    if (event == "ALL") {
      delete this.params["search.categoryName"];
    }

    this.addItems();
  }

  resetPage() {
    this.pageModel = null;
    this.products = [];
    this.finished = false;

    delete this.params.pageIndex;
    delete this.params.pageSize;
  }
}
