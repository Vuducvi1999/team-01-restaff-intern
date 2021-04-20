import { Component, OnInit } from "@angular/core";
import { ReturnMessage } from "src/app/lib/data/models";
import { HomeProductModel } from "src/app/lib/data/models/home/product.model";
import { HomeService } from "src/app/lib/data/services/home/home.service";
import { Product } from "src/app/shared/classes/product";
import { ProductSlider } from "src/app/shared/data/slider";
import { ProductService } from "src/app/shared/services/product.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  public products: HomeProductModel[] = [];
  public productCollections: any[] = [];

  constructor(public homeService: HomeService) {
    this.homeService
      .getTopCollectionProducts()
      .then((data: ReturnMessage<HomeProductModel[]>) => {
        this.products = data.data;
      });
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

  // Collection banner
  public collections = [
    {
      image: "assets/images/collection/fashion/1.jpg",
      save: "save 50%",
      title: "men",
    },
    {
      image: "assets/images/collection/fashion/2.jpg",
      save: "save 50%",
      title: "women",
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

  // Logo
  public logo = [
    {
      image: "assets/images/logos/1.png",
    },
    {
      image: "assets/images/logos/2.png",
    },
    {
      image: "assets/images/logos/3.png",
    },
    {
      image: "assets/images/logos/4.png",
    },
    {
      image: "assets/images/logos/5.png",
    },
    {
      image: "assets/images/logos/6.png",
    },
    {
      image: "assets/images/logos/7.png",
    },
    {
      image: "assets/images/logos/8.png",
    },
  ];

  ngOnInit(): void {}

  // Product Tab collection
  getCollectionProducts(collection) {
    return null;
  }
}
