import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  hide: boolean = true;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let loggedUser = this.accountService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);

    if(!loggedUser) {
      this.loading = false;
      this.error = 'Please check Your credentials!'

    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }

  showPassword() {
    this.hide = false;
  }

  hidePassword() {
    this.hide = true;
  }

}
