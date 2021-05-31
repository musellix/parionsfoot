import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from '../models/team.model';
import { TeamService } from '../team.service';

@Component({
   selector: 'xix-team',
   templateUrl: './team.component.html',
   styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

   public team: TeamModel;
   public teamService: TeamService;
   private titleService: Title;
   public route: ActivatedRoute;
   public hasError: boolean;

   constructor(teamService: TeamService, titleService: Title, route: ActivatedRoute) {
      this.teamService = teamService;
      this.titleService = titleService;
      this.route = route;
   }

   ngOnInit(): void {
      const id: string = this.route.snapshot.paramMap.get('teamId');
      console.log(`Team component :: id = ${id}`);
      this.teamService.get(id).subscribe({
         next: (team: TeamModel) => {
            this.hasError = false;
            this.team = team;
            this.titleService.setTitle(this.team.name);
         },
         error: (error: any) => {
            this.hasError = true;
         }
      });
   }

}
