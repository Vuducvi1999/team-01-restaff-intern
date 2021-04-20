import { Component, OnInit } from '@angular/core';
import {
  ChangePasswordProfileModel,
  FileDtoModel,
  ProfileModel,
  UserDataReturnDTOModel,
} from 'src/app/lib/data/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService, ProfileService } from 'src/app/lib/data/services';
import { ActivatedRoute } from '@angular/router';
import {
  ModalFile,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public userInfo: UserDataReturnDTOModel;
  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  submitted = false;
  public updateProfile: ProfileModel;
  public passwordProfile: ChangePasswordProfileModel;
  update = false;

  public modalFile: ModalFile;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = 'user';
  }

  ngOnInit() {
    // console.log(this.route.parent.parent.parent.snapshot.data);
    this.userInfo = this.route.parent.parent.parent.snapshot.data.user;
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
      firstName: [
        this.userInfo ? this.userInfo.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.userInfo ? this.userInfo.lastName : '',
        Validators.required,
      ],
      email: [this.userInfo ? this.userInfo.email : '', Validators.required],
      imageUrl: [
        this.userInfo ? this.userInfo.imageUrl : '',
        Validators.required,
      ],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }

  updateSwitch() {
    this.update = this.update == true ? false : true;
  }
  updateDetails() {
    if (window.confirm('Do you want to update your profile?')) {
      this.updateProfile = {
        firstName: this.profileForm.controls.firstName.value,
        lastName: this.profileForm.controls.lastName.value,
        email: this.profileForm.controls.email.value,
        imageUrl: this.profileForm.controls.imageUrl.value,
        id: this.userInfo.id,
      };
      this.profileService
        .update(this.updateProfile)
        .then((resp) => {
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.userInfo = resp.data;
          this.route.snapshot.data.user = resp.data;
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }
  }
  changePassword() {
    if (window.confirm('Do you want to change your password?')) {
      this.passwordProfile = {
        password: this.passwordForm.controls.password.value,
        newPassword: this.passwordForm.controls.newPassword.value,
        confirmNewPassword: this.passwordForm.controls.confirmNewPassword.value,
        userName: this.userInfo.username,
      };
      this.profileService
        .changePassword(this.passwordProfile)
        .then((resp) => {
          this.passwordForm.reset();
          window.alert(resp.message);
          console.log(resp);
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }
  }

  onChangeData(event: FileDtoModel[]) {
    if (event || event.length > 0) {
      this.profileForm.controls.imageUrl.setValue(event[0].url);
    }
  }

  get getImage() {
    return FileService.getLinkFile(this.userInfo.imageUrl);
  }
}
