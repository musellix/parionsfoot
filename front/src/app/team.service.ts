import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamModel } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

   public http: HttpClient;

   constructor(http: HttpClient) {
      this.http = http;
   }

   public get(id: string): Observable<TeamModel> {
      const baseUrl = 'http://localhost:8080';
      const params = {
         id: id
      };
      return this.http
         .get<TeamModel>(`${baseUrl}/team`, { params });
   }

}
