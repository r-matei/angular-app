import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DashboardService } from '../_services';

import { Artwork } from '../_models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  item: Artwork | undefined;
  items: [];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    const data = this.dashboardService.getDataById(idFromRoute);
    this.item = await lastValueFrom(data);
  }

}
