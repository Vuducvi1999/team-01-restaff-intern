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
  products: HomeProductModel[] = [];
  newProducts: HomeProductModel[] = [];
  bestSellerProducts: HomeProductModel[] = []
  featuredProducts: HomeProductModel[] = []
  onSaleProducts: HomeProductModel[] = []

  constructor(public homeService: HomeService) {
    this.getTopCollectionProducts()
    this.getNewProducts()
    this.getBestSellerProducts()
    this.getFeaturedProducts()
    this.getOnSaleProducts()
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

  // Top Collection
  getTopCollectionProducts() {
    this.homeService
      .getTopCollectionProducts()
      .then((data: ReturnMessage<HomeProductModel[]>) => {
        this.products = data.data;
      }).catch(e => { console.log(e); });
  }

  // New Products
  getNewProducts() {
    this.homeService.getNewProducts().then((data: ReturnMessage<HomeProductModel[]>) => {
      this.newProducts = data.data;
    }).catch(e => { console.log(e); })
  }

  // Best Seller
  getBestSellerProducts() {
    this.homeService.getBestSellerProducts().then((data: ReturnMessage<HomeProductModel[]>) => {
      this.bestSellerProducts = data.data;
    }).catch(e => { console.log(e); })
  }

  // Featured Products
  getFeaturedProducts() {
    this.homeService.getFeaturedProducts().then((data: ReturnMessage<HomeProductModel[]>) => {
      this.featuredProducts = data.data;
    }).catch(e => { console.log(e); })
  }

  // ON sale
  getOnSaleProducts() {
    this.homeService.getOnSaleProducts().then((data: ReturnMessage<HomeProductModel[]>) => {
      this.onSaleProducts = data.data;
    }).catch(e => { console.log(e); })
  }
}
