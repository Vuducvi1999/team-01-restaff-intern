import { Component, OnInit } from "@angular/core";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { BannerModel } from "src/app/lib/data/models/banners/banner.model";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { HomeService } from "src/app/lib/data/services/home/home.service";
import { ProductService } from "src/app/lib/data/services/products/product.service";
import { ProductSlider } from "src/app/shared/data/slider";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [HomeService, ProductService],
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];
  blogs: BlogModel[] = [];
  banners: BannerModel[] = [];

  constructor(public homeService: HomeService) {}

  public ProductSliderConfig: any = ProductSlider;

  ngOnInit(): void {
    this.getProducts();
    this.getBlogs();
    this.getBanners();
  }

  getProducts() {
    this.homeService
      .getTopCollectionProducts()
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data.filter((i) => i.isDeleted === false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getNewProducts() {
    const result = [...this.products];
    result.sort(
      (a, b) =>
        new Date(a.updateByDate).getTime() - new Date(b.updateByDate).getTime()
    );
    return result;
  }
  getBestSeller() {
    const result = [...this.products];
    result.sort(
      (a, b) =>
        new Date(a.updateByDate).getTime() - new Date(b.updateByDate).getTime()
    );
    return result;
  }
  getFeaturedProducts() {
    const result = [...this.products];
    result.sort(
      (a, b) =>
        new Date(a.updateByDate).getTime() - new Date(b.updateByDate).getTime()
    );
    return result;
  }
  getOnSale() {
    const result = [...this.products];
    result.sort(
      (a, b) =>
        new Date(a.updateByDate).getTime() - new Date(b.updateByDate).getTime()
    );
    return result;
  }

  getBlogs() {
    this.homeService
      .getBlogs()
      .then((data: ReturnMessage<BlogModel[]>) => {
        this.blogs = data.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getBanners() {
    this.homeService
      .getBanners()
      .then((data: ReturnMessage<BannerModel[]>) => {
        this.banners = data.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
