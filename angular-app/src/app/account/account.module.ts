import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NgxPasswordStrengthMeterModule } from 'ngx-password-strength-meter';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      AccountRoutingModule,
      NgxPasswordStrengthMeterModule
  ],
  declarations: [
      LayoutComponent,
      LoginComponent,
      RegisterComponent
  ]
})
export class AccountModule { }
