import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { ProductModel } from 'src/app/lib/data/models/products/product.model';
import { FileService } from 'src/app/lib/data/services';
import { ProductService } from 'src/app/lib/data/services/products/product.service';
import { CustomViewCellNumberComponent } from 'src/app/shared/components/custom-view-cell-number/custom-view-cell-number.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
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
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (file) => {
          // console.log(file);
          var fileExt = file.split(',')[0].split('.').pop();
          if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'icon'
          ) {
            return `<a href="${FileService.getLinkFile(file.split(',')[0])}"><img appUiImageLoader width="75px" height="75px" src="${FileService.getLinkFile(file.split(',')[0])}"/></a>`;
          }
          return `<a href="${FileService.getLinkFile(file.split(',')[0])}">${FileService.getLinkFile(file.split(',')[0])}</a>`;
        },
      },
      name: {
        title: 'Name',
        filter: false,
      },
      description: {
        title: 'Description',
        filter: false,
      },
      categoryName: {
        title: 'Category Name',
        filter: false,
      },
      isImportant: {
        title: 'Is Important',
        filter: false,
      },
      price: {
        value:'price',
        type: 'custom',
        title:'Price',
        renderComponent: CustomViewCellNumberComponent,
        filter: false,
      },
      displayOrder: {
        title: 'Display Order',
        type:'custom',
        value:'displayOrder',
        renderComponent: CustomViewCellComponent,
        filter: false,
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
      var modalRef = this.modalService.open(ProductDetailsComponent, {size: 'xl'});
      modalRef.componentInstance.item = item?.data;
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
          this.products = res.data.results;
        }
      })
      .catch((er) => {
        if (er.error.hasError)
        {
          // console.log(er.error.message);
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
