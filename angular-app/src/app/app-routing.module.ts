import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './_helpers';
import { NgxPaginationModule } from 'ngx-pagination';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, NgxPaginationModule],
  exports: [RouterModule],
  declarations: [DashboardComponent, DetailsComponent]
})
export class AppRoutingModule { }
