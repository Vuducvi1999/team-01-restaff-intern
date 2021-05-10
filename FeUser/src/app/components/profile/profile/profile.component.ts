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

  submittedProfile = false;
  submittedPassword = false;

  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user) {
      this.fileURL = [];
      this.fileURL.push(this.user.imageUrl);
    }
    this.createChangePasswordForm();
    this.createProfileForm();
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.CUSTOMER;
  }

  ngOnInit(): void {}

  profileSwith() {
    this.updateProfile = !this.updateProfile;
    this.submittedProfile = false;
    this.createProfileForm();
  }

  passwordSwith() {
    this.updatePassword = !this.updatePassword;
    this.submittedPassword = false;
    this.createChangePasswordForm();
  }

  get fProfile() {
    return this.profileForm.controls;
  }

  get fPassword() {
    return this.changePasswordForm.controls;
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [
        this.user ? this.user.firstName : "",
        [Validators.required, Validators.maxLength(35)],
      ],
      lastName: [
        this.user ? this.user.lastName : "",
        [Validators.required, Validators.maxLength(35)],
      ],
      phone: [
        this.user ? this.user.phone : "",
        [Validators.required, Validators.pattern("[0-9]{10}"),
        Validators.maxLength(11),]
      ],
      address: [
        this.user ? this.user.address : "",
        [Validators.required, Validators.maxLength(90)],
      ],
      email: [
        this.user ? this.user.email : "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"),
          Validators.maxLength(90),
        ],
      ],
      // imageUrl: [this.user ? this.user.imageUrl : "", [Validators.required]],
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      { validators: this.checkValidatorsPassword }
    );
  }

  checkValidatorsPassword(group: FormGroup) {
    const pass = group.get("newPassword");
    const confirmpass = group.get("confirmPassword");
    if (pass.value !== confirmpass.value) {
      confirmpass.setErrors({ mustMatch: true });
    }
  }

  async onChangePassword() {
    this.submittedPassword = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
    var data: ChangePasswordProfileModel = this.changePasswordForm.value;
    await this.profileService
      .changePassword(data)
      .then((res: ReturnMessage<null>) => {
        alert("Change Password Success");
        this.passwordSwith();
      })
      .catch((er) => {
        alert(er.error.message ? er.error.message : "Server is disconnected");
      });
  }

  async onUpdateProfile() {
    this.submittedProfile = true;

    if (this.profileForm.invalid && this.user?.id) {
      return;
    }

    var dataProfileForm: ProfileModel = this.profileForm.value;
    var data: ProfileModel = {
      imageUrl: null,
      email: dataProfileForm.email,
      address: dataProfileForm.address,
      firstName: dataProfileForm.firstName,
      lastName: dataProfileForm.lastName,
      files: this.modalFile ? this.modalFile.listFile : null,
      id: this.user.id,
      phone: dataProfileForm.phone,
    };

    await this.profileService
      .update(data)
      .then((res: ReturnMessage<UserDataReturnDTOModel>) => {
        this.user = res.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        alert("Update Profile Success");
        this.profileSwith();
      })
      .catch((er) => {
        alert(er.error.message ? er.error.message : "Server is disconnected");
      });
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }

  // onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
  //   if (event == null) {
  //     return;
  //   }

  //   if (!this.fileURL) {
  //     this.fileURL = [];
  //   }

  //   if (event.add) {
  //     this.fileURL = [...this.fileURL, ...event.add];
  //   }

  //   if (event.remove) {
  //     this.fileURL.forEach((e : string, i) => {
  //       if (e.includes(event.remove)) {
  //         this.fileURL.splice(i, 1);
  //       }
  //     });
  //   }

  //   if (event.removeAll) {
  //     this.fileURL = [];
  //   }

  //   this.profileForm.controls.imageUrl.setValue(this.fileURL.join(','));
  // }
}
