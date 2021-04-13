import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.component.html',
  styleUrls: ['./create-suppliers.component.scss']
})
export class CreateSuppliersComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      confirmPwd: ['']
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }


  ngOnInit() { }


  get(){

  }

}
