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
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { TypeDisplayImage } from "src/app/shared/data";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";
import { ProductService } from "src/app/lib/data/services/products/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  providers: [ProductDetailsService, CommentService, ProductService],
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

  constructor(
    private productDetailsService: ProductDetailsService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    public productService: ProductService
  ) {
    this.getProduct();
  }

  ngOnInit(): void {}

  getProduct() {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.productDetailsService
        .get(param.id)
        .then((res: ReturnMessage<ProductDetailsModel>) => {
          this.product = res.data;
        });
      this.initDataComment();
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
      customerId: this.user ? this.user.id : "",
      entityId: this.activatedRoute.snapshot.queryParamMap.get("id"),
      entityType: "Product",
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
      })
      .catch((e) => {
        console.log(e);
      });
  }
  formatCurrency(){
    return this.product?.price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });
    //return Intl.NumberFormat('en-US',{style:'currency', currency: 'VND'}).format(this.product?.price);
  }
}
