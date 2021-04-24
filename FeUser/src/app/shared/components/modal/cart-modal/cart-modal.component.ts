import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from 'src/app/lib/data/models/products/product.model';
import { CartService } from 'src/app/lib/data/services/cart/cart.service';
import { FileService } from 'src/app/lib/data/services';
import { ProductService } from 'src/app/lib/data/services/products/product.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  providers: [CartService]
})
export class CartModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() product: ProductModel;
  @Input() currency: any;

  @ViewChild("cartModal", { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public products: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private productService: ProductService,
    private cartService: CartService) {
    { }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  async openModal(product) {
    const getData = await this.productService.getByCategory(product.categoryId,null);
    this.products = getData.data;

    // this.products = await this.products.filter(items => items.categoryName == product.categoryName && items.id != product.id);

    const status = await this.cartService.addToCart(product);
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
  getImage(image) {
    return FileService.getLinkFile(image)
  }

}
