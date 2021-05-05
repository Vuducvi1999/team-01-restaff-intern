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

  constructor(public homeService: HomeService) {
    this.getProducts();
    this.getBlogs();
    this.getBanners();
  }

  public ProductSliderConfig: any = ProductSlider;

  ngOnInit(): void {}

  getProducts() {
    this.homeService
      .getTopCollectionProducts()
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data.filter((i) => i.isDeleted === false);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getBlogs() {
    this.homeService
      .getBlogs()
      .then((data: ReturnMessage<BlogModel[]>) => {
        this.blogs = data.data;
        console.log("Blog Data", data);
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
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
