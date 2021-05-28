import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { LeagueService } from '../league.service';
import { LeagueModel } from '../models/league.model';

@Component({
   selector: 'xix-league',
   templateUrl: './league.component.html',
   styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

   public league: LeagueModel;
   public leagueService: LeagueService;
   private titleService: Title;
   public route: ActivatedRoute;
   public router: Router;

   constructor(leagueService: LeagueService, titleService: Title, router: Router, route: ActivatedRoute) {
      this.leagueService = leagueService;
      this.titleService = titleService;
      this.router = router;
      this.route = route;

      this.router.events.subscribe((event: Event) => {
         if (event instanceof NavigationEnd) {
            this.getLeague();
         }
      });
   }

   ngOnInit(): void { }

   private getLeague(): void {
      const id: string = this.route.snapshot.paramMap.get('leagueId');
      this.leagueService.get(id).subscribe((league: LeagueModel) => {
         this.league = league;
         console.log(`League component :: this.league = `);
         console.log(this.league)
         this.titleService.setTitle( this.league.name );
      });
   }



}