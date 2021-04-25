import { Component, OnInit } from "@angular/core";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
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
  blogs: BlogModel[]=[];

  constructor(public homeService: HomeService) {
    this.getProducts();
    this.getBlogs();
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [
    {
      title: "welcome to fashion",
      subTitle: "Men fashion",
      image: "assets/images/slider/1.jpg",
    },
    {
      title: "welcome to fashion",
      subTitle: "Women fashion",
      image: "assets/images/slider/2.jpg",
    },
  ];

  ngOnInit(): void {}

  getProducts() {
    this.homeService
      .getTopCollectionProducts()
      .then((data: ReturnMessage<ProductModel[]>) => {
        this.products = data.data;
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
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
