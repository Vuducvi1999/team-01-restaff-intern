import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import {CategoriesService} from 'src/app/lib/data/services/categories/category.service'
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
  providers: [CategoriesService]
})
export class CreateCategoriesComponent implements OnChanges {

  public categoriesForm: FormGroup;
  public permissionForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public category: CategoryModel;
  public data : any;
      
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
  }
  constructor(private formBuilder: FormBuilder
    , private service: CategoriesService
    , private ngbActiveModal: NgbActiveModal) {

      if(this.data == null){
        this.loadItem();
      }
      this.loadEditItem();
    }


    save(event:any){
      if(this.data == null){
        this.create();
      }
      this.edit();
    }
    loadItem(){
      this.categoriesForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]]
      });
      this.modalHeader = new ModalHeaderModel();
      this.modalHeader.title = this.data ? `[Update] ${this.data.name}` : `[Add]`;
      this.modalFooter = new ModalFooterModel();
      this.modalFooter.title = "Save";
  
    }

    loadEditItem(){
      this.categoriesForm = this.formBuilder.group({
        name: [this.data ? this.data.name: '', [Validators.required]],
        description: [this.data ? this.data.description: '', [Validators.required]],
        imageUrl: [this.data ? this.data.imageUrl: '', [Validators.required]]
      });
      this.modalHeader = new ModalHeaderModel();
      this.modalHeader.title = this.data ? `[Update] ${this.data.name}` : `[Add]`;
      this.modalFooter = new ModalFooterModel();
      this.modalFooter.title = "Save";
    }
    

    
    close(event : any) {
      console.log(event);
      this.ngbActiveModal.close();
    }

    create(){
      this.category = {name: this.categoriesForm.controls.name.value, 
                    description: this.categoriesForm.controls.description.value,
                    imageUrl: this.categoriesForm.controls.imageUrl.value,
                    id: ''};

     const formData = new FormData();
     formData.append("name", this.category.name);
     formData.append("description", this.category.description);
     formData.append("imageUrl", this.category.imageUrl);
                
      this.service.create(formData).then(res => {
        console.log(res)
        this.ngbActiveModal.close();
      }).catch((er) => {

        if (er.error.hasError) {
          console.log(er.error.message)
        }
      });
    }

    edit(){
      this.category = {name: this.categoriesForm.controls.name.value, 
        description: this.categoriesForm.controls.description.value,
        imageUrl: this.categoriesForm.controls.imageUrl.value,
        id: this.data.id};

      const formData = new FormData();
      formData.append("name", this.category.name);
      formData.append("description", this.category.description);
      formData.append("imageUrl", this.category.imageUrl);
      formData.append("id", this.category.id);
                 
       this.service.update(formData).then(res => {
         console.log(res)
         this.ngbActiveModal.close();
       }).catch((er) => {
 
         if (er.error.hasError) {
           console.log(er.error.message)
         }
       });
    }


    ngOnInit(){
      
    }


}
