import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginModel, ReturnMessage } from 'src/app/lib/data/models';
import { AuthService } from 'src/app/lib/data/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private api: AuthService) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }


  ngOnInit() {

  }

  onLogin() {
    if(this.loginForm.valid)
    {
      var data : AuthLoginModel = this.loginForm.value;
      this.api.saveAccount(data);
    }
  }

}
