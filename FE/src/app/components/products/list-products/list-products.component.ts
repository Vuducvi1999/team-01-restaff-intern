import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { ProductModel } from 'src/app/lib/data/models/products/product.model';
import { FileService } from 'src/app/lib/data/services';
import { ProductService } from 'src/app/lib/data/services/products/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [ProductService],
})
export class ListProductsComponent implements OnInit {
  public products: ProductModel[];
  closeResult = '';

  constructor
  (
    private modalService: NgbModal,
    private productService: ProductService
  ) 
  { 
    this.fetch();
  }

  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      imageUrl: {
        title: 'ImageURL',
        type: 'html',
        filter: false,
        valuePrepareFunction: (file) => {
          console.log(file);
          var fileExt = file.split(',')[0].split('.').pop();
          if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'icon'
          ) {
            return `<a href="${FileService.getLinkFile(file.split(',')[0])}"><img width="75px" height="75px" src="${FileService.getLinkFile(file.split(',')[0])}"/></a>`;
          }
          return `<a href="${FileService.getLinkFile(file.split(',')[0])}">${FileService.getLinkFile(file.split(',')[0])}</a>`;
        },
      },
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      contentHTML: {
        title: 'Content HTML',
      },
      price: {
        title: 'Price',
      },
      categoryName: {
        title: 'Category Name',
      },
      displayOrder: {
        title: 'Display Order',
      },
      hasDisplayHomePage: {
        title: 'Display Home Page',
      },
      isImportant: {
        title: 'Is Important',
      },
    },
  };
  delete(event: any) {
    let product = event.data as ProductModel;
    if (window.confirm('Are you sure to delete this item?')) {
      this.productService.delete(product).then(() => {
        this.fetch();
      });
    }
  }

  openPopup(item: any) {
    if (item) {
      var modalRef = this.modalService.open(ProductDetailsComponent, {size: 'lg'});
      modalRef.componentInstance.item = item.data as ProductModel;
      return modalRef.result.then(() => {
          this.fetch();
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
    var modalRef = this.modalService.open(ProductDetailsComponent, {size: 'lg'});
    modalRef.componentInstance.item = item as ProductModel;
    return modalRef.result.then(() => {
        this.fetch();
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  fetch()
  {
    this.productService
      .get(null)
      .then((res: ReturnMessage<PageModel<ProductModel>>) => {
        if (!res.hasError) 
        {
          this.products = res.data.results.filter((r) => r.isDeleted == false);
        }
      })
      .catch((er) => {
        if (er.error.hasError)
        {
          console.log(er.error.message);
        }
      });
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

  ngOnInit() {}
}
