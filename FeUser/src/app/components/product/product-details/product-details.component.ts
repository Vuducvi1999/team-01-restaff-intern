import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  CommentModel,
  CommentPassingModel,
} from "src/app/lib/data/models/comments/comment.model";
import { ProductDetailsModel } from "src/app/lib/data/models/products/product-details.model";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { FileService } from "src/app/lib/data/services";
import { ProductDetailsService } from "src/app/lib/data/services/products/product-details.service";
import { SizeModalComponent } from "src/app/shared/components/modal/size-modal/size-modal.component";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "src/app/shared/data/slider";

import {
  PageModel,
  ProductModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TypeDisplayImage } from "src/app/shared/data";
registerLocaleData(localeFr, 'fr');
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RatingService } from "src/app/lib/data/services/rating/rating.service";
import { RatingModel } from "src/app/lib/data/models/rating/rating.model";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  providers: [ProductDetailsService, RatingService],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
    `,
  ],
})
export class ProductDetailsComponent implements OnInit {
  public product: ProductDetailsModel;
  public counter: number = 1;
  public activeSlide: any = 0;
  public ImageSrc: string;
  public id: string;
  public dataComment: CommentPassingModel;
  public typeDisplayImage = TypeDisplayImage;
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  public currentRate: number;
  public token: string;
  public ratingForm: FormGroup;
  public ratingModel: RatingModel;
  public item: any;

  constructor(
    private productService: ProductDetailsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.getProduct();
    this.initDataComment();
    if (this.token != null) {
      this.loadFormItem();
      this.getRating();
    }
  }

  getProduct() {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.productService
        .get(param.id)
        .then((res: ReturnMessage<ProductDetailsModel>) => {
          this.product = res.data;
        });
    });
  }

  getRating() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const data = { productId: param.id };
      return this.ratingService
        .get({ params: data })
        .then((it: ReturnMessage<RatingModel>) => {
          this.item = it.data;
        });
    });
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  initDataComment() {
    const user: UserDataReturnDTOModel = JSON.parse(
      localStorage.getItem("user")
    );

    this.dataComment = {
      fullName: user ? user.firstName + " " + user.lastName : "",
      customerId: user ? user.id : "",
      entityId: this.activatedRoute.snapshot.queryParamMap.get("id"),
      entityType: "Product",
    };
  }

  loadFormItem() {
    this.ratingForm = this.formBuilder.group({
      rating: [this.item ? this.item.rating : 1],
    });
  }

  saveRating(event: any) {
    this.ratingModel = {
      rating: this.ratingForm.controls?.rating.value,
      productId: this.product.id,
      customerId: JSON.parse(localStorage.getItem("user")).customerId,
      id: this.item ? this.item?.id : "",
    };
    this.ratingService
      .save(this.ratingModel)
      .then(() => {
        this.getRating();
      })
      .catch((er) => {
        console.log(er);
      });
  }
}
