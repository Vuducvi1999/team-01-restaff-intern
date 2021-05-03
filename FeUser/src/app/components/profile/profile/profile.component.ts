import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ChangePasswordProfileModel,
  ProfileModel,
  ReturnMessage,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { FileService } from "src/app/lib/data/services";
import { ProfileService } from "src/app/lib/data/services/profiles/profile.service";
import {
  EntityType,
  ModalFile,
  TypeFile,
} from "src/app/shared/modals/models/modal.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {
  updateProfile: boolean = true;
  updatePassword: boolean = true;
  changePasswordForm: FormGroup;
  profileForm: FormGroup;
  user: UserDataReturnDTOModel;

  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.createChangePasswordForm();
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.CUSTOMER;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.createProfileForm();
    if (this.user) {
      this.fileURL = [];
      this.fileURL.push(this.user.imageUrl);
    }
  }

  profileSwith() {
    this.updateProfile = !this.updateProfile;
  }

  passwordSwith() {
    this.updatePassword = !this.updatePassword;
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.user ? this.user.firstName : "", [Validators.required]],
      lastName: [this.user ? this.user.lastName : "", [Validators.required]],
      phone: [this.user ? this.user.phone : "", [Validators.required]],
      address: [this.user ? this.user.address : "", [Validators.required]],
      email: [this.user ? this.user.email : "", [Validators.required]],
      imageUrl: [this.user ? this.user.imageUrl : "", [Validators.required]],
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      this.checkValidatorsPassword
    );
  }

  checkValidatorsPassword(group: FormGroup) {
    const pass = group.get("password");
    const confirmpass = group.get("confirmPassword");
    if (pass.value !== confirmpass.value) {
      confirmpass.setErrors({ mustMatch: true });
    }
  }

  onChangePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    var data: ChangePasswordProfileModel = this.changePasswordForm.value;
    this.profileService
      .changePassword(data)
      .then((res: ReturnMessage<null>) => {
        if (!res.hasError) {
          alert("Change Password Success");
        }
        if (res.hasError) {
          alert(res.message);
        }
      })
      .catch((er) => {
        alert(er.error ? er.error.message : "Server Disconnected");
      });
  }

  onUpdateProfile() {
    if (this.profileForm.invalid && this.user?.id) {
      return;
    }

    var dataProfileForm: ProfileModel = this.profileForm.value;
    var data: ProfileModel = {
      imageUrl: dataProfileForm.imageUrl,
      email: dataProfileForm.email,
      address: dataProfileForm.address,
      firstName: dataProfileForm.firstName,
      lastName: dataProfileForm.lastName,
      files: this.modalFile ? this.modalFile.listFile : null,
      id: this.user.id,
      phone: dataProfileForm.phone,
    };

    this.profileService
      .update(data)
      .then((res: ReturnMessage<UserDataReturnDTOModel>) => {
        this.user = res.data;
        localStorage.setItem('user',JSON.stringify(this.user));
        alert("Update Profile Success");
      })
      .catch((er) => {
        alert(er.error ? er.error.message : "Server is disconnected");
      });
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if (!this.fileURL) {
      this.fileURL = [];
    }

    if (event.add) {
      this.fileURL = [...this.fileURL, ...event.add];
    }

    if (event.remove) {
      this.fileURL.forEach((e, i) => {
        if (e == event.remove) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if (event.removeAll) {
      this.fileURL = [];
    }

    this.profileForm.controls.imageUrl.setValue(this.fileURL.toString());
  }
}
