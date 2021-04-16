import { Component, OnInit } from '@angular/core';
import { ChangePasswordProfileModel, ProfileModel, UserDataReturnDTOModel } from 'src/app/lib/data/models';
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
  public passwordForm: FormGroup;
  submitted = false;
  public updateProfile: ProfileModel;
  public passwordProfile: ChangePasswordProfileModel
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
  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  loadFormItem() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.userInfo ? this.userInfo.firstName : '', Validators.required],
      lastName: [this.userInfo ? this.userInfo.lastName : '', Validators.required],
      email: [this.userInfo ? this.userInfo.email : '', Validators.required],
      imageUrl: [this.userInfo ? this.userInfo.imageUrl : '', Validators.required],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });

  }
  updateDetails() {
    if (window.confirm("Are u sure?")) {
      this.updateProfile = {
        firstName: this.profileForm.controls.firstName.value,
        lastName: this.profileForm.controls.lastName.value,
        email: this.profileForm.controls.email.value,
        imageUrl: this.profileForm.controls.imageUrl.value,
        id: this.userInfo.id
      }
      this.profileService.update(this.updateProfile).then(resp => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        this.userInfo = JSON.parse(localStorage.getItem('user'));
      }).catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
    }
  }
  changePassword() {
    if (window.confirm("Are u sure?")) {
      this.passwordProfile = {
        password: this.passwordForm.controls.password.value,
        newPassword: this.passwordForm.controls.newPassword.value,
        confirmNewPassword: this.passwordForm.controls.confirmNewPassword.value,
        userName: this.userInfo.username
      }
      this.profileService.changePassword(this.passwordProfile).then(resp => {
        this.passwordForm.reset();
        window.alert(resp.message);
        console.log(resp);

      }).catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
    }
  }

}
