import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  CommentModel,
  CommentPassingModel,
  SearchCommentModel,
} from "src/app/lib/data/models/comments/comment.model";
import { ProductDetailsModel } from "src/app/lib/data/models/products/product-details.model";
import {
  UserDataReturnDTOModel,
  UserModel,
} from "src/app/lib/data/models/users/user.model";
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
  SearchPaganationDTO,
} from "src/app/lib/data/models";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { TypeDisplayImage } from "src/app/shared/data";
registerLocaleData(localeFr, "fr");
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { BlogModel } from "src/app/lib/data/models/blogs/blog.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RatingModel } from "src/app/lib/data/models/rating/rating.model";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  providers: [ProductDetailsService, CommentService],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: blue;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: blue;
      }
    `,
  ],
})
export class ProductDetailsComponent implements OnInit {
  public product: ProductDetailsModel;
  public counter: number = 1;
  public activeSlide: any = 0;
  public ImageSrc: string;
  public dataComment: CommentPassingModel;
  public typeDisplayImage = TypeDisplayImage;
  public user: UserDataReturnDTOModel;
  public comments: PageModel<CommentModel>;
  public searchModel: SearchPaganationDTO<SearchCommentModel>;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  public currentRate: number;
  public token: string;
  public item: any;

  public rating: number;

  constructor(
    private productService: ProductDetailsService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.getProduct();
    this.initDataComment();
    this.getRating();
  }

  getRating() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const data = { entityId: params.id };
      this.commentService
        .getRating({ params: data })
        .then((res: ReturnMessage<number>) => {
          this.rating = res.data;
        });
    });
  }

  getProduct() {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.productService
        .get(param.id)
        .then((res: ReturnMessage<ProductDetailsModel>) => {
          this.product = res.data;
        });
      this.createSearchModel();
      this.getComments();
    });
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  initDataComment() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.dataComment = {
      fullName: this.user ? this.user.firstName + " " + this.user.lastName : "",
      customerId: this.user ? this.user.customerId : "",
      entityId: this.activatedRoute.snapshot.queryParamMap.get("id"),
      entityType: "Product",
      rating: 1,
    };
  }

  createSearchModel() {
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");
    this.searchModel = {
      search: { entityId: id },
      pageIndex: 0,
      pageSize: 10,
    };
  }

  changePageIndex(pageIndex: number) {
    this.searchModel = { ...this.searchModel, pageIndex: pageIndex - 1 };

    this.getComments();
  }

  getComments() {
    this.commentService
      .getProductComments(this.searchModel)
      .then((data: ReturnMessage<PageModel<CommentModel>>) => {
        this.comments = data.data;
        console.log(this.comments);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
