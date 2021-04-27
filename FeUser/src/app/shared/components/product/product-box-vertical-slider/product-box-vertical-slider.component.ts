import { Component, OnInit, Input } from "@angular/core";
import { NewProductSlider } from "../../../data/slider";
import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { FileService, ProductListService } from "src/app/lib/data/services";
import { ETypeSizeImage } from "src/app/shared/data";

@Component({
  selector: "app-product-box-vertical-slider",
  templateUrl: "./product-box-vertical-slider.component.html",
  styleUrls: ["./product-box-vertical-slider.component.scss"],
  providers: [ProductListService],
})
export class ProductBoxVerticalSliderComponent implements OnInit {
  @Input() title: string = "New Product"; // Default
  @Input() type: string = "fashion"; // Default Fashion
  @Input() size: number = 3;
  @Input() typeSizeImage: string = ETypeSizeImage.SMALL;

  result: ProductModel[][] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productListService: ProductListService) {
    this.callData();
  }

  ngOnInit(): void {
    // this.result = new Array(Math.ceil(this.products.length / this.size))
    //   .fill()
    //   .map((_) => this.products.splice(0, this.size));
  }

  callData() {
    this.productListService
      .getPageProduct({ params: { pageSize: 12 } })
      .then((res: ReturnMessage<PageModel<ProductModel>>) => {
        while (res.data.results.length != 0) {
          this.result.push(res.data.results.splice(0, this.size));
        }
      })
      .catch((res) => console.error(res));
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
