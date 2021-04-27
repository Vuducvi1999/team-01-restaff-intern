import {
  Component,
  OnInit,
  Injectable,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { FileService } from "src/app/lib/data/services";
import { ProductModel, ReturnMessage } from "src/app/lib/data/models";
import { CartService } from "src/app/lib/data/services/cart/cart.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  providers: [CartService],
})
export class SettingsComponent implements OnInit {
  public products: ProductModel[] = [];
  public search: boolean = false;
  public name: string;
  public value: any;

  public languages = [
    {
      name: "English",
      code: "en",
    },
    {
      name: "French",
      code: "fr",
    },
  ];

  public currencies = [
    {
      name: "Euro",
      currency: "EUR",
      price: 0.9, // price of euro
    },
    {
      name: "Rupees",
      currency: "INR",
      price: 70.93, // price of inr
    },
    {
      name: "Pound",
      currency: "GBP",
      price: 0.78, // price of euro
    },
    {
      name: "Dollar",
      currency: "USD",
      price: 1, // price of usd
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public cartService: CartService,
    public router: Router,
    private activatedRoute: ActivatedRoute // private productService: ProductService
  ) {
    this.cartService.cartItems.subscribe(
      (response) => (this.products = response)
    );
  }

  ngOnInit(): void {
    this.getRoute();
  }

  searchToggle() {
    this.search = !this.search;
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code);
    }
  }

  get getTotal(): Observable<number> {
    return this.cartService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  getRoute() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.name = params["name"];
    });
  }

  onSearch(event: KeyboardEvent) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
      this.router.navigate(["product"], {
        queryParams: { search: event.target?.value },
      });
      console.log(event.target?.value);
      this.search = false;
    }
  }
}
