import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthRegistModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, SweetalertService } from "src/app/lib/data/services";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sweetalertService: SweetalertService
  ) {
    this.createRegistForm();
    if (localStorage.getItem("token")) {
      this.backUrl();
    }
  }

  ngOnInit(): void {}
  createRegistForm() {
    this.registForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(
              "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
            ),
          ],
        ],
        password: [null, [Validators.required]],
        confirmpassword: [null, [Validators.required]],
      },
      { validators: this.checkValidators }
    );
  }

  get f() {
    return this.registForm.controls;
  }

  checkValidators(group: FormGroup) {
    const pass = group.get("password");
    const confirmpass = group.get("confirmpassword");
    if (pass.value !== confirmpass.value) {
      confirmpass.setErrors({ mustMatch: true });
    }
  }

  async onRegist() {
    this.submitted = true;

    if (this.registForm.invalid) {
      return;
    }

    var data: AuthRegistModel = this.registForm.value;
    data.username = data.username.trim();
    data.lastName = data.lastName.trim();
    data.firstName = data.firstName.trim();
    data.email = data.email.trim();
    data.confirmpassword = undefined;
    await this.authService
      .register(data)
      .then((data: ReturnMessage<UserDataReturnDTOModel>) => {
        this.sweetalertService.notification(
          "Register Success",
          TypeSweetAlertIcon.SUCCESS,
          `Wecome ${data.data.firstName}!`
        );
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        this.backUrl();
      })
      .catch((er) => {
        this.sweetalertService.alert(
          "Register Fail",
          TypeSweetAlertIcon.ERROR,
          `${er.error.message ?? er.error}`
        );
      });
  }

  backUrl() {
    var returnUrl = this.activedRoute.snapshot.queryParams["returnUrl"] || "/";
    this.callUrl(returnUrl);
  }

  callUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
