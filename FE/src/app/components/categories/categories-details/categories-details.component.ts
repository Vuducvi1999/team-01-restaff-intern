import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';

import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';
@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss'],
  providers: [CategoryService]
})
export class CategoryDetailComponent implements OnChanges {

  public categoriesForm: FormGroup;
  public permissionForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public category: CategoryModel;
  public item : any;
      
  ngOnChanges(changes: SimpleChanges): void {
  }
  constructor(private formBuilder: FormBuilder
    , private categoryService: CategoryService
    , private ngbActiveModal: NgbActiveModal) {
    }


    save(event:any){
      if(this.item == null){
        this.create();
      }
      this.update();
    }
    loadItem(){
      this.categoriesForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]]
      });
      this.modalHeader = new ModalHeaderModel();
      this.modalHeader.title = this.item ? `[Update] ${this.item.name}` : `[Add]`;
      this.modalFooter = new ModalFooterModel();
      this.modalFooter.title = "Save";
  
    }

    loadEditItem(){
      this.categoriesForm = this.formBuilder.group({
        name: [this.item.data.name, [Validators.required]],
        description: [this.item.data.description, [Validators.required]],
        imageUrl: [this.item.data.imageUrl, [Validators.required]]
      });
      this.modalHeader = new ModalHeaderModel();
      this.modalHeader.title = this.item ? `[Update] ${this.item.data.name}` : `[Add]`;
      this.modalFooter = new ModalFooterModel();
      this.modalFooter.title = "Save";
    }
    

    
    close(event : any) {
      this.ngbActiveModal.close();
    }

    create(){
      this.category = {name: this.categoriesForm.value.name, 
                    description: this.categoriesForm.value.description,
                    imageUrl: this.categoriesForm.value.imageUrl,
                    id: this.item?.id};
                
      if(this.categoriesForm.invalid){
        return;
      }
      this.categoryService.create(this.category).then(res => {
        this.ngbActiveModal.close();
      }).catch((er) => {

        if (er.error.hasError) {
          console.log(er.error.message)
        }
      });
    }

    update(){
      this.category = {name: this.categoriesForm.value.name, 
        description: this.categoriesForm.value.description,
        imageUrl: this.categoriesForm.value.imageUrl,
        id: this.item.data.id};
                             
      if(this.categoriesForm.invalid){
        return;
      }    
       this.categoryService.update(this.category).then(res => {
         this.ngbActiveModal.close();
       }).catch((er) => {
 
         if (er.error.hasError) {
           console.log(er.error.message)
         }
       });
    }


    ngOnInit(){
      if(this.item == null){
        this.loadItem();
      }
      this.loadEditItem();
    }


}
