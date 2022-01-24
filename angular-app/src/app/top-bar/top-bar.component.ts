import { Component } from '@angular/core';

import { AccountService } from '../_services';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent{

  constructor(private accountService: AccountService) {}

  logout() {
    this.accountService.logout();
  }

}
