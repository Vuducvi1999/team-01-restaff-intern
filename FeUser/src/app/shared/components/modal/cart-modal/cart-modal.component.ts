import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../classes/product";
import { HomeProductModel } from 'src/app/lib/data/models/home/product.model';
import { HomeService } from 'src/app/lib/data/services/home/home.service';
import { ReturnMessage } from 'src/app/lib/data/models';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() product: HomeProductModel;
  @Input() currency: any;

  @ViewChild("cartModal", { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public products: HomeProductModel[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private homeService: HomeService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  async openModal(product: HomeProductModel) {
    await this.homeService.getNewProducts().then((response: ReturnMessage<HomeProductModel[]>) => this.products = response.data);
    this.products = await this.products.filter((items: HomeProductModel) => items.categoryName == product.categoryName && items.id != product.id);
    const status = await this.homeService.addToCart(product);
    if (status) {
      this.modalOpen = true;
      if (isPlatformBrowser(this.platformId)) { // For SSR 
        this.modalService.open(this.CartModal, {
          size: 'lg',
          ariaLabelledBy: 'Cart-Modal',
          centered: true,
          windowClass: 'theme-modal cart-modal CartModal'
        }).result.then((result) => {
          `Result ${result}`
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
