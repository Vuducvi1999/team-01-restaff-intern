import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  ChangePasswordProfileModel,
  ProfileModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import {
  AuthService,
  FileService,
  SweetalertService,
} from "src/app/lib/data/services";
import { ProfileService } from "src/app/lib/data/services/profiles/profile.service";
import {
  EntityType,
  ModalFile,
  TypeFile,
} from "src/app/shared/modals/models/modal.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [ProfileService, AuthService],
})
export class ProfileComponent implements OnInit, OnDestroy {
  updateProfile: boolean = true;
  updatePassword: boolean = true;
  changePasswordForm: FormGroup;
  profileForm: FormGroup;
  user: UserDataReturnDTOModel;

  subDataUser: Subscription;

  submittedProfile = false;
  submittedPassword = false;

  // public modalFile: ModalFile;
  // public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private sweetalertService: SweetalertService
  ) {
    // this.user = JSON.parse(localStorage.getItem("user"));
    // if (this.user) {
    //   this.fileURL = [];
    //   this.fileURL.push(this.user.imageUrl);
    // }
    // this.modalFile = new ModalFile();
    // this.modalFile.typeFile = TypeFile.IMAGE;
    // this.modalFile.multiBoolen = false;
    // this.modalFile.enityType = EntityType.CUSTOMER;
  }
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
    this.subDataUser = null;
  }

  ngOnInit(): void {
    this.subDataUser = this.authService.callUserInfo.subscribe((it) => {
      this.user = it;
      this.createProfileForm();
    });
    this.createChangePasswordForm();
  }

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
        [
          Validators.required,
          Validators.pattern("[0-9]{10}"),
          Validators.maxLength(11),
        ],
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
        this.sweetalertService.notification(
          "Change Password Success",
          TypeSweetAlertIcon.SUCCESS
        );
        this.passwordSwith();
      })
      .catch((er) => {
        this.sweetalertService.alert(
          "Change Password Fail",
          TypeSweetAlertIcon.ERROR,
          er.error.message ?? er.error
        );
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
      files: null,
      id: this.user.id,
      phone: dataProfileForm.phone,
    };

    await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.profileService
          .update(data)
          .then((res: ReturnMessage<UserDataReturnDTOModel>) => {
            this.authService.changeUserInfo(res.data);
            this.sweetalertService.notification(
              "Upload Profile Success",
              TypeSweetAlertIcon.SUCCESS
            );
            this.profileSwith();
          })
          .catch((er) => {
            this.sweetalertService.alert(
              "Upload Profile Fail",
              TypeSweetAlertIcon.ERROR,
              er.error.message ?? er.error
            );
          });
      }
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
