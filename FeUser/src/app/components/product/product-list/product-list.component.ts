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
import { ProductListService } from "src/app/lib/data/services";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  providers: [ProductListService],
})
export class ProductListComponent implements OnInit {
  public grid: string = "col-xl-3 col-md-6";
  public layoutView: string = "grid-view";
  public products: ProductModel[];
  public pageModel: PageModel<ProductModel>;
  // public all_products: any[] = [];
  // public products: any[] = [];
  // public brands: any[] = [];
  // public colors: any[] = [];
  // public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 5000000;
  public tags: any[] = [];
  // public category: string;
  // public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: number = ETypeSort.NULL; // Sorting Order
  public mobileSidebar: boolean = false;
  // public loader: boolean = true;
  public finished: boolean = false; // boolean when end of data is reached
  // public addItemCount = 8;
  public params;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productListService: ProductListService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      this.products = [];
      this.params = {};
      //'search.id': null,
      // 'search.name': null,
      // 'search.description': null,
      // 'search.imageUrl': null,
      // 'search.contentHTML': null,
      // 'search.displayOrder': null,
      // 'search.categoryId': null,
      // 'search.categoryName': null,
      // 'search.price': null,
      // 'search.isImportant': null,

      this.finished = false;

      if (params.category) {
        this.params["search.categoryName"] = params.category;
      }

      console.log(JSON.stringify(this.params));
      this.addItems();
      // this.brands = params.brand ? params.brand.split(",") : [];
      // this.colors = params.color ? params.color.split(",") : [];
      // this.size = params.size ? params.size.split(",") : [];
      // this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      // this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      // this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      // this.category = params.category ? params.category : null;
      // this.sortBy = params.sortBy ? params.sortBy : "ascending";

      // // Get Filtered Products..
      // this.productService.filterProducts(this.tags).subscribe((response) => {
      //   // All Products
      //   this.all_products = response;

      //   // Sorting Filter
      //   this.all_products = this.productService.sortProducts(
      //     response,
      //     this.sortBy
      //   );

      //   // Category Filter
      //   if (params.category)
      //     this.all_products = this.all_products.filter(
      //       (item) => item.type == this.category
      //     );

      //   // Price Filter
      //   this.all_products = this.all_products.filter(
      //     (item) => item.price >= this.minPrice && item.price <= this.maxPrice
      //   );

      //   this.addItems();
      // });
    });
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

        console.log(this.products);
      });
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
    // tags.page = null; // Reset Pagination
    // this.router
    //   .navigate([], {
    //     relativeTo: this.route,
    //     queryParams: tags,
    //     queryParamsHandling: "merge", // preserve the existing query params in the route
    //     skipLocationChange: false, // do trigger navigation
    //   })
    //   .finally(() => {
    //     this.viewScroller.setOffset([120, 120]);
    //     this.viewScroller.scrollToAnchor("products"); // Anchore Link
    //   });
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
    // this.router
    //   .navigate([], {
    //     relativeTo: this.route,
    //     queryParams: { sortBy: value ? value : null },
    //     queryParamsHandling: "merge", // preserve the existing query params in the route
    //     skipLocationChange: false, // do trigger navigation
    //   })
    //   .finally(() => {
    //     this.viewScroller.setOffset([120, 120]);
    //     this.viewScroller.scrollToAnchor("products"); // Anchore Link
    //   });
  }

  // // Remove Tag
  // removeTag(tag) {
  //   this.brands = this.brands.filter((val) => val !== tag);
  //   this.colors = this.colors.filter((val) => val !== tag);
  //   this.size = this.size.filter((val) => val !== tag);

  //   let params = {
  //     brand: this.brands.length ? this.brands.join(",") : null,
  //     color: this.colors.length ? this.colors.join(",") : null,
  //     size: this.size.length ? this.size.join(",") : null,
  //   };

  //   this.router
  //     .navigate([], {
  //       relativeTo: this.route,
  //       queryParams: params,
  //       queryParamsHandling: "merge", // preserve the existing query params in the route
  //       skipLocationChange: false, // do trigger navigation
  //     })
  //     .finally(() => {
  //       this.viewScroller.setOffset([120, 120]);
  //       this.viewScroller.scrollToAnchor("products"); // Anchore Link
  //     });
  // }

  // // Clear Tags
  // removeAllTags() {
  //   this.router
  //     .navigate([], {
  //       relativeTo: this.route,
  //       queryParams: {},
  //       skipLocationChange: false, // do trigger navigation
  //     })
  //     .finally(() => {
  //       this.viewScroller.setOffset([120, 120]);
  //       this.viewScroller.scrollToAnchor("products"); // Anchore Link
  //     });
  // }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == "list-view") this.grid = "col-lg-12";
    else this.grid = "col-xl-3 col-md-6";
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  onChangeTypeCate(event: string) {
    this.resetPage();

    this.params["search.categoryName"] = event;

    if (event == "ALL") {
      delete this.params["search.categoryName"];
    }

    this.addItems();
  }

  resetPage()
  {
    this.pageModel = null;
    this.products = [];
    this.finished = false;

    delete this.params.pageIndex;
    delete this.params.pageSize;
  }
}
