import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
  AuthLoginModel,
  ReturnMessage,
  UserDataReturnDTOModel,
} from 'src/app/lib/data/models';
import { AuthService } from 'src/app/lib/data/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.createLoginForm();
    this.createRegisterForm();
    if(localStorage.getItem('token'))
    {
      this.backUrl();
    }
  }

  owlcarousel = [
    {
      title: 'Welcome to Multikart',
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: 'Welcome to Multikart',
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: 'Welcome to Multikart',
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  ngOnInit() {

  }

  async onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    var data: AuthLoginModel = this.loginForm.value;
    await this.authService
      .login(data)
      .then((data: ReturnMessage<UserDataReturnDTOModel>) => {
        alert(data.message);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        this.backUrl();
      })
      .catch((er) => {
        alert(er.error.message);
      });
  }

  backUrl() {
    var returnUrl = this.activedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }
}
