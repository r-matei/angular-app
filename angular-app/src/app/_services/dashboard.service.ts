import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getData(page : number) {
    return this.http.get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12&fields=id,title,artist_display,date_display,artist_title`).pipe(map((item: any) => item.data));
  }

  getDataById(id : number) {
    return this.http.get(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_display,classification_titles,date_start,date_end,date_display,dimensions,exhibition_history`).pipe(map((item: any) => item.data));
  }

  getArtists() {
    return this.http.get(`https://api.artic.edu/api/v1/artworks?fields=artist_title&limit=100`).pipe(map((item: any) => item.data));
  }

  getDataByArtist(artist : string, page : number) {
    return this.http.get(`https://api.artic.edu/api/v1/artworks/search?q=${artist}&page=${page}&limit=12`).pipe(map((item: any) => item.data));
  }
}
