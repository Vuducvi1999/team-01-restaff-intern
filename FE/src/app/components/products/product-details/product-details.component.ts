import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FileDtoModel,
  PageModel,
  ReturnMessage,
} from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { ProductModel } from 'src/app/lib/data/models/products/product.model';
import { FileService } from 'src/app/lib/data/services';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';
import { ProductService } from 'src/app/lib/data/services/products/product.service';
import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';
import { ListCategoriesComponent } from '../../categories/list-categories/list-categories.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductService, CategoryService],
})
export class ProductDetailsComponent implements OnInit {
  public productsForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public product: ProductModel;
  public categories: CategoryModel[];
  public item: any;

  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private ngbActiveModal: NgbActiveModal,
    private categoryService: CategoryService
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = true;
    this.modalFile.enityType = EntityType.PRODUCT;
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    this.fetchCategory();
    this.loadItem();
    if (this.item) {
      this.fileURL = [];
      console.log(this.item.imageUrl);
      this.item.imageUrl.split(',').forEach((it) => {
        this.fileURL.push(it);
      });
    }
  }

  fetchCategory() {
    this.categoryService
      .get(null)
      .then((res: ReturnMessage<PageModel<CategoryModel>>) => {
        if (!res.hasError) {
          this.categories = res.data.results.filter(
            (r) => r.isDeleted == false
          );

          // //default value category name equal the first element of array categories
          // this.productsForm.controls.categoryName.setValue(this.categories[0], {
          //   onlySelf: true,
          // });
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }
  save() {
    if (this.productsForm.invalid) {
      return;
    }
    this.product = {
      name: this.productsForm.value.name,
      description: this.productsForm.value.description,
      contentHTML: this.productsForm.value.contentHTML,
      imageUrl: this.productsForm.value.imageUrl,
      price: this.productsForm.value.price,
      categoryName: this.categories.filter(
        (it) => it.id == this.productsForm.value.categoryName
      )[0].name,
      categoryId: this.productsForm.value.categoryName,
      displayOrder: this.productsForm.value.displayOrder,
      hasDisplayHomePage: this.productsForm.value.hasDisplayHomePage,
      isImportant: this.productsForm.value.isImportant,
      id: this.item ? this.item.id : '',
      createdBy: this.item ? this.item.createdBy : this.item,
      createdByName: this.item ? this.item.createdByName : this.item,
      deletedBy: this.item ? this.item.deletedBy : this.item,
      deletedByName: this.item ? this.item.deletedByName : this.item,
      isActive: this.item ? this.item.isActive : this.item,
      isDeleted: this.item ? this.item.isDeleted : this.item,
      updatedBy: this.item ? this.item.updatedBy : this.item,
      updatedByName: this.item ? this.item.updatedByName : this.item,
      files: this.modalFile.listFile,
    };
    return this.productService
      .save(this.product)
      .then(() => {
        this.ngbActiveModal.close();
      })
      .catch((er) => {
        
          console.log(er);
        
      });
  }

  loadItem() {
    this.productsForm = this.formBuilder.group({
      name: [this.item ? this.item.name : '', [Validators.required]],
      description: [
        this.item ? this.item.description : '',
        [Validators.required],
      ],
      contentHTML: [
        this.item ? this.item.contentHTML : '',
        [Validators.required],
      ],
      imageUrl: [this.item ? this.item.imageUrl : ''],
      price: [this.item ? this.item.price : '', [Validators.required]],
      categoryName: [
        this.item ? this.item.categoryId : '',
        [Validators.required],
      ],
      displayOrder: [
        this.item ? this.item.displayOrder : 0,
        [Validators.required],
      ],
      hasDisplayHomePage: [
        this.item ? this.item.hasDisplayHomePage : false,
        [Validators.required],
      ],
      isImportant: [
        this.item ? this.item.isImportant : false,
        [Validators.required],
      ],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.name}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if(!this.fileURL)
    {
      this.fileURL = [];
    }

    if (event.add) {
      this.fileURL = [...this.fileURL, ...event.add];
    }

    if(event.remove)
    {
      this.fileURL.forEach((e, i) => {
        if (e == event.remove) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if(event.removeAll)
    {
      this.fileURL = [];
    }

    this.productsForm.controls.imageUrl.setValue(this.fileURL.toString());
  }
}
