import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';

import {
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss'],
  providers: [CategoryService],
})
export class CategoryDetailComponent implements OnInit {
  public categoriesForm: FormGroup;
  public permissionForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public category: CategoryModel;
  public modalSingleImage: ModalFile;

  public item: any;

  ngOnChanges(changes: SimpleChanges): void {}

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private ngbActiveModal: NgbActiveModal
  ) {
    
  }

  save() {
    if (this.modalHeader.title == '[Add]') {
      this.category = {
        name: this.categoriesForm.value.name,
        description: this.categoriesForm.value.description,
        imageUrl: this.modalSingleImage.listFile
          ? this.modalSingleImage.listFile[0].url
          : null,
        id: '',
        images: this.modalSingleImage.listFile
          ? this.modalSingleImage.listFile
          : null,
      };

      // if (this.categoriesForm.invalid) {
      //   console.log('asdasd');
      //   return;
      // }
      this.categoryService
        .create(this.category)
        .then(() => {
          this.ngbActiveModal.close();
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }

    if (this.item.id) {
      this.category = {
        name: this.categoriesForm.value.name,
        description: this.categoriesForm.value.description,
        imageUrl: this.modalSingleImage.listFile
          ? this.modalSingleImage.listFile[0].url
          : null,
        id: this.item.id,
        images: this.modalSingleImage.listFile
          ? this.modalSingleImage.listFile
          : null,
      };

      // if (this.categoriesForm.invalid) {   return;
      // }

      this.categoryService
        .update(this.category)
        .then(() => {
          this.ngbActiveModal.close();
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }
  }
  loadItem() {
    this.categoriesForm = this.formBuilder.group({
      name: [this.item ? this.item.name : '', [Validators.required]],
      description: [
        this.item ? this.item.description : '',
        [Validators.required],
      ],
      imageUrl: [this.item ? this.item.imageUrl : '', [Validators.required]],
    });
    this.modalSingleImage = new ModalFile();
    this.modalSingleImage.enityType = 'category';
    if (this.item?.imgeUrl) {
      this.modalSingleImage.listFile = [];
      console.log(this.item.imageUrl);
      this.modalSingleImage.listFile.push(this.item.imageUrl);
    }

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.name}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  ngOnInit() {
    this.loadItem();
  }
}
