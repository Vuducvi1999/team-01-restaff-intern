import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CategoriesService} from 'src/app/lib/data/services/categories/category.service'
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {

  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder
    , private _categoryService: CategoriesService) {}




  ngOnInit() {
  }

}
