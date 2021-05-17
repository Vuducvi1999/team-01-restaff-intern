import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AuthLoginModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { MessageService } from "src/app/lib/data/services";
import { AuthService } from "src/app/lib/data/services/auth/auth.service";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent {
  public loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  backUrl() {
    var returnUrl = this.activedRoute.snapshot.queryParams["returnUrl"] || "/";
    this.callUrl(returnUrl);
  }

  callUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  get f() {
    return this.loginForm.controls;
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
        this.messageService.notification(
          "Login Success",
          TypeSweetAlertIcon.SUCCESS,
          `Wecome ${data.data.firstName}!`
        );
        localStorage.setItem("token", data.data.token);
        this.authService.changeUserInfo(data.data);
        this.backUrl();
        this.activeModal.dismiss();
      })
      .catch((er) => {
        this.messageService.alert(
          "Login Fail",
          TypeSweetAlertIcon.ERROR,
          `${er.error.message ?? er.error}`
        );
      });
  }
}