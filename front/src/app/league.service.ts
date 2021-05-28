import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeagueModel } from './models/league.model';

@Injectable({
   providedIn: 'root'
})
export class LeagueService {

   public http: HttpClient;

   constructor(http: HttpClient) {
      this.http = http;
   }

   public list(): Observable<Array<LeagueModel>> {
      const baseUrl = 'http://localhost:8080';
      return this.http
         .get<LeagueModel[]>(`${baseUrl}/leagues`);
   }

   public search(value: string): Observable<Array<LeagueModel>> {
      const baseUrl = 'http://localhost:8080';
      return this.http
         .get<LeagueModel[]>(`${baseUrl}/leagues`)
         .pipe(
            map(
               (leagues: Array<LeagueModel>) => leagues.filter((aLeague: LeagueModel) => aLeague.name.toLowerCase().includes(value.toLowerCase()))
            )
         )
   }

   public get(id: string): Observable<LeagueModel> {
      const baseUrl = 'http://localhost:8080';
      const params = {
         id: id
      };
      return this.http
         .get<LeagueModel>(`${baseUrl}/league`, { params });
   }

}
