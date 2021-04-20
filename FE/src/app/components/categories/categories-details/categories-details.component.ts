import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileDtoModel } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { FileService } from 'src/app/lib/data/services';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';

import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
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

  public modalFile: ModalFile;
  public fileURL : (String | ArrayBuffer)[];

  public item: any;

  ngOnChanges(changes: SimpleChanges): void {}

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private ngbActiveModal: NgbActiveModal
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.CATEGORY;
  }

    save(){
      if(this.categoriesForm.invalid){
        return;
      }
      this.category = {name: this.categoriesForm.value.name, 
        description: this.categoriesForm.value.description,
        imageUrl: this.categoriesForm.value.imageUrl,
          id: this.item ? this.item.id : '',
          files: this.modalFile.listFile
      };
      return this.categoryService.save(this.category)
                      .then(() => {
                          this.ngbActiveModal.close();
                      }).catch((er) => {
                        if (er.error.hasError) {
                          console.log(er.error.message)
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

    loadItem(){
      this.categoriesForm = this.formBuilder.group({
        name: [this.item ? this.item.name : '', [Validators.required]],
        description: [this.item ? this.item.description : '', [Validators.required]],
        imageUrl: [this.item ? this.item.imageUrl : '', [Validators.required]]
      });
      

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
    if(this.item)
    {
      this.fileURL = [];
      this.fileURL.push(FileService.getLinkFile(this.item.imageUrl));
    }
  }

  onChangeData(event: FileDtoModel[]) {
    if (event || event.length > 0) {
      this.fileURL = null;
      this.categoriesForm.controls.imageUrl.setValue(event[0].url);
    }
  }
}
