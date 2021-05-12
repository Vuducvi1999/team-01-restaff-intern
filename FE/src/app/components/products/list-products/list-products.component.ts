import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { ProductModel } from 'src/app/lib/data/models/products/product.model';
import { FileService } from 'src/app/lib/data/services';
import { ProductService } from 'src/app/lib/data/services/products/product.service';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
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
      imageUrl:{
        title: 'Image',
        type: 'custom',
        renderComponent: ViewImageCellComponent,
      },
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      price: {
        value:'price',
        type: 'custom',
        title:'Price',
        renderComponent: CustomViewCellNumberComponent
      },
      categoryName: {
        title: 'Category Name',
      },
      displayOrder: {
        title: 'Display Order',
        type:'custom',
        value:'displayOrder',
        renderComponent: CustomViewCellComponent
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
