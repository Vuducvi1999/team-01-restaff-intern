import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "src/app/lib/data/services/profiles/profile.service";

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
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.createChangePasswordForm();
  }

  ngOnInit(): void {}

  profileSwith() {
    this.updateProfile = !this.updateProfile;
  }

  passwordSwith() {
    this.updatePassword = !this.updatePassword;
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, this.checkValidatorsPassword);
  }

  checkValidatorsPassword(group: FormGroup) {
    const pass = group.get("password");
    const confirmpass = group.get("confirmPassword");
    if (pass.value !== confirmpass.value) {
      confirmpass.setErrors({ mustMatch: true });
    }
  }
  
  onChangePassword()
  {

  }
}
