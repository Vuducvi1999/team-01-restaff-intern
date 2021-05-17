import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthLoginModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, MessageService } from "src/app/lib/data/services";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sweetalertService: MessageService
  ) {
    this.createLoginForm();
    if (localStorage.getItem("token")) {
      this.backUrl();
    }
  }

  ngOnInit(): void {}

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  backUrl() {
    var returnUrl = this.activedRoute.snapshot.queryParams["returnUrl"] || "/";
    this.callUrl(returnUrl);
  }

  callUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  async onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    var data: AuthLoginModel = this.loginForm.value;
    data.username = data.username.trim();
    await this.authService
      .login(data)
      .then((data: ReturnMessage<UserDataReturnDTOModel>) => {
        this.sweetalertService.notification(
          "Login Success",
          TypeSweetAlertIcon.SUCCESS,
          `Wecome ${data.data.firstName}!`
        );
        localStorage.setItem("token", data.data.token);
        this.authService.changeUserInfo(data.data);
        this.backUrl();
      })
      .catch((er) => {
        this.sweetalertService.alert(
          "Login Fail",
          TypeSweetAlertIcon.ERROR,
          `${er.error.message ?? 'Connect Server Fail'}`
        );
      });
  }
}
