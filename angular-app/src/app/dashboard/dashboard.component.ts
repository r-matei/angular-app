import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { DashboardService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  items: any = [];
  artists: any = [];
  selectedArtist: any = '';
  page: number = 1;
  pageSize: number = 12;
  total: number = 100;
  responsive: boolean = true;

  constructor(
   private dashboardService: DashboardService
  ) {}

  async ngOnInit() {
    const data = this.dashboardService.getData(this.page);
    this.items = await lastValueFrom(data);

    const artistsData = this.dashboardService.getArtists();
    this.artists = await lastValueFrom(artistsData);
    this.artists = Array.from(this.artists, (x:any) => x.artist_title);
    this.artists = this.artists.filter((el:any, i:any, a:any) => i === a.indexOf(el) && el !== null);
  }

  async handlePageChange(event : any) {
    this.page = event;
    let data;
    if (this.selectedArtist) {
      data = this.dashboardService.getDataByArtist(this.selectedArtist, this.page);
    } else {
      data = this.dashboardService.getData(this.page);
    }
    this.items = await lastValueFrom(data);
  }

  async filterData(artist : any | null) {
    this.selectedArtist = artist.value;
    this.page = 1;
    const data = this.dashboardService.getDataByArtist(this.selectedArtist, this.page);
    this.items = await lastValueFrom(data);
  }

}
