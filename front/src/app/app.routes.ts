import { Routes } from "@angular/router";
import { LeagueComponent } from "./league/league.component";
import { TeamComponent } from "./team/team.component";

export const ROUTES: Routes = [
   {
      path: 'league',
      children: [
         { path: '', component: LeagueComponent },
         { path: ':leagueId', component: LeagueComponent },
      ]
   },
   {
      path: 'team',
      children: [
         { path: ':teamId', component: TeamComponent },
      ]
   },

];
