import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import {CategoriesService} from 'src/app/lib/data/services/categories/category.service'
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
  providers: [CategoriesService]
})
export class CreateCategoriesComponent implements OnInit {

  public categoriesForm: FormGroup;
  public permissionForm: FormGroup;
  public category: CategoryModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  
  constructor(private formBuilder: FormBuilder
    , private service: CategoriesService
    , private ngbActiveModal: NgbActiveModal) {

      this.createCategoryForm();
      this.createPermissionForm();
      this.createModal();
    }

  closeResult = '';

  createCategoryForm() {
    this.categoriesForm = this.formBuilder.group({
      name: [''],
      description: [''],
      imageURL: ['']
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = "Add Category";
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  createCategory(event:any) {
      this.category = {
        name: this.categoriesForm.controls.name.value,
        description: this.categoriesForm.controls.description.value,
        imageUrl: this.categoriesForm.controls.imageURL.value,
        id: ""
      }
      const formData = new FormData();
      formData.append("name" , this.category.name);
      formData.append("description" , this.category.description);
      formData.append("imageURL" , this.category.imageUrl);

      this.service.create(formData).then(res => console.log(res));
    }


    close(event: any) {
      console.log(event);
      this.ngbActiveModal.close();
    }
  
    save(event: any) { }


    
  ngOnInit() {
  }


}
