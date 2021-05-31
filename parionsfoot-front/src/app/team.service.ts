import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      const baseUrl = environment.baseUrl;
      const params = {
         id
      };
      return this.http
         .get<TeamModel>(`${baseUrl}/team`, { params });
   }

}
