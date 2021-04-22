import { Component, OnInit } from "@angular/core";
import { PageModel, ProductModel, ReturnMessage } from "src/app/lib/data/models";
import { HomeService } from "src/app/lib/data/services/home/home.service";
import { ProductService } from "src/app/lib/data/services/products/product.service";
import { Product } from "src/app/shared/classes/product";
import { ProductSlider } from "src/app/shared/data/slider";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [HomeService, ProductService],
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(public homeService: HomeService, private productService: ProductService) {
    this.getProducts()
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

  // Blog
  public blog = [
    {
      image: "assets/images/blog/1.jpg",
      date: "25 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/2.jpg",
      date: "26 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/3.jpg",
      date: "27 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/4.jpg",
      date: "28 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
  ];

  ngOnInit(): void { }

  getProducts() {
    this.productService
      .get(null)
      .then((data: ReturnMessage<PageModel<ProductModel>>) => {
        this.products = data.data.results
        console.log(this.products)
      }).catch(e => { console.log(e); });
  }
}
