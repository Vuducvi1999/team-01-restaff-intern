import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  CommentModel,
  CreateCommentModel,
} from "src/app/lib/data/models/comments/comment.model";
import { ProductDetailsModel } from "src/app/lib/data/models/products/product-details.model";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, FileService } from "src/app/lib/data/services";
import { ProductDetailsService } from "src/app/lib/data/services/products/product-details.service";
import { SizeModalComponent } from "src/app/shared/components/modal/size-modal/size-modal.component";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "src/app/shared/data/slider";

import { PageModel, ReturnMessage } from "src/app/lib/data/models";
import { TypeDisplayImage } from "src/app/shared/data";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { Subscription } from "rxjs";
import { CartService } from "src/app/lib/data/services/cart/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  providers: [ProductDetailsService, CommentService, CartService],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 2.5rem;
        color: #d3d3d3;
      }
      .full {
        color: #ffa200;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: #ffa200;
      }
    `,
  ],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  public product: ProductDetailsModel;
  public counter: number = 1;
  public activeSlide: any = 0;
  public ImageSrc: string;
  public dataComment: CreateCommentModel;
  public typeDisplayImage = TypeDisplayImage;
  public user: UserDataReturnDTOModel;
  public comments: PageModel<CommentModel>;
  public searchModel: any;
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  subDataUser: Subscription;

  public currentRate: number;
  public token: string;
  public item: any;

  public rating: number;

  constructor(
    private productDetailsService: ProductDetailsService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.subDataUser = this.authService.callUserInfo.subscribe(
      (it) => (this.user = it)
    );
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
      this.productDetailsService
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
    this.dataComment = {
      entityId: this.activatedRoute.snapshot.queryParamMap.get("id"),
      entityType: "Product",
      rating: 0,
    };
  }

  createSearchModel() {
    const id = this.activatedRoute.snapshot.queryParamMap.get("id");
    this.searchModel = {
      ["search.entityId"]: id,
      ["pageIndex"]: 0,
      ["pageSize"]: 10,
    };
  }

  changePageIndex(pageIndex: number) {
    this.searchModel = { ...this.searchModel, ["pageIndex"]: pageIndex - 1 };

    this.getComments();
  }

  getComments() {
    this.commentService
      .getProductComments(this.searchModel)
      .then((data: ReturnMessage<PageModel<CommentModel>>) => {
        this.comments = data.data;
      })
      .catch((e) => {
        console.log(e);
      });
    this.getRating();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.toastrService.success(`${product?.name}` + " has been added to cart.");
  }
}
