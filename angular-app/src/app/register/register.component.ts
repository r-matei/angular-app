import { Component, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  loading = false;
  submitted = false;
  @Input() password: string;
  @Input() min = 8;
  @Input() max = 30;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
  ) { }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.register(this.registerForm.value)
}

}
