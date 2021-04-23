import { Component, ElementRef, EventEmitter, OnInit, Output } from "@angular/core";
import {
  CategoryModel,
  PageModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { ProductListService } from "src/app/lib/data/services";
import { Product } from "../../classes/product";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
  providers: [ProductListService],
})
export class CategoriesComponent implements OnInit {
  public products: Product[] = [];
  public collapse: boolean = true;
  public categories: CategoryModel[] = [];

  event: any;
  @Output() onChangeTypeCate = new EventEmitter();

  constructor(public productListService: ProductListService, private elRef:ElementRef) {
    this.productListService
      .getCategory()
      .then((res: ReturnMessage<CategoryModel[]>) => {
        this.categories = res.data;
      });
  }

  ngOnInit(): void {
    this.elRef.nativeElement.getElementsByClassName('ALL')[0].style.color = "black";
    this.elRef.nativeElement.getElementsByClassName('ALL')[0].style["font-weight"] = "bold";
  }

  get filterbyCategory() {
    const category = this.categories;
    return category;
  }

  onSelect(event, typeCate: string) {
    if(!this.event)
    {
      this.elRef.nativeElement.getElementsByClassName('ALL')[0].style.color = "#777777";
      this.elRef.nativeElement.getElementsByClassName('ALL')[0].style["font-weight"] = "normal";
    }
    if (this.event) {
      this.event.target.style.color = "#777777";
      this.event.target.style["font-weight"] = "normal";
    }
    this.event = event;
    this.bigImg(this.event);
    this.onChangeTypeCate.emit(typeCate);
  }

  bigImg(event) {
    event.target.style.color = "black";
    event.target.style["font-weight"] = "bold";
  }

  normalImg(event) {
    event.target.style.color = "#777777";
    event.target.style["font-weight"] = "normal";
    this.bigImg(this.event);
    // event.style.height = "32px";
    // event.style.width = "32px";
  }
}
