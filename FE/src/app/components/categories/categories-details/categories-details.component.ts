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
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public category: CategoryModel;

  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  public item: any;
  submitted = false;
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
  get categoryFormsControl() {
    return this.categoriesForm.controls;
  }
    save(){
      if(this.categoriesForm.invalid){
        window.alert("Invalid Form !");
        return;
      }
      this.submitted = true;
      this.category = {name: this.categoriesForm.value.name, 
        description: this.categoriesForm.value.description,
        imageUrl: this.categoriesForm.value.imageUrl,
        createdBy: this.item ? this.item.createdBy : this.item,
        createdByName: this.item ? this.item.createdByName : this.item,
        deletedBy: this.item ? this.item.deletedBy : this.item,
        deletedByName: this.item ? this.item.deletedByName : this.item,
        isActive: this.item ? this.item.isActive : this.item,
        isDeleted: this.item ? this.item.isDeleted : this.item,
        updatedBy: this.item ? this.item.updatedBy : this.item,
          updatedByName: this.item ? this.item.updatedByName : this.item,
          files: this.modalFile.listFile,
        id: this.item ? this.item.id : '',};
      return this.categoryService.save(this.category)
                      .then(() => {
                          this.ngbActiveModal.close();
                      }).catch((er) => {
                        if (er.error.hasError) {
                          console.log(er.error.message)
                        }
                      });
    }

  // if (this.categoriesForm.invalid) {   return;
  // }

  loadItem() {
    this.categoriesForm = this.formBuilder.group({
      name: [this.item ? this.item.name : '',
       [Validators.required
        , Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
      description: [
        this.item ? this.item.description : '',
        [Validators.required
          , Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
      imageUrl: [this.item ? this.item.imageUrl : '']
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
    if (this.item) {
      this.fileURL = [];
      this.fileURL.push(this.item.imageUrl);
    }
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

    this.categoriesForm.controls.imageUrl.setValue(this.fileURL.toString());
  }
}
