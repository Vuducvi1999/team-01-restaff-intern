import { Component, OnInit } from '@angular/core';
import { ProfileModel, UserDataReturnDTOModel } from 'src/app/lib/data/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/lib/data/services';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public userInfo: UserDataReturnDTOModel;
  public profileForm: FormGroup;
  submitted = false;
  public profile: ProfileModel;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService

  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.loadFormItem();
  }

  get profileFormControl() {
    return this.profileForm.controls;
  }

  loadFormItem() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.userInfo ? this.userInfo.firstName : '', Validators.required],
      lastName: [this.userInfo ? this.userInfo.lastName : '', Validators.required],
      email: [this.userInfo ? this.userInfo.email : '', Validators.required],
      imageUrl: [this.userInfo ? this.userInfo.imageUrl : '', Validators.required],
    });
  }
  updateDetails() {
    this.profile = {
      firstName: this.profileForm.controls.firstName.value,
      lastName: this.profileForm.controls.lastName.value,
      email: this.profileForm.controls.email.value,
      imageUrl: this.profileForm.controls.imageUrl.value,
      id: this.userInfo.id
    }
    this.profileService.update(this.profile).then(resp =>
      console.log(resp)).catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });

  }

}
