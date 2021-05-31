import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { LeagueService } from '../league.service';
import { LeagueModel } from '../models/league.model';

@Component({
   selector: 'xix-leaguesearch',
   templateUrl: './leaguesearch.component.html',
   styleUrls: ['./leaguesearch.component.css']
})
export class LeaguesearchComponent implements OnInit {

   public leagueService: LeagueService;
   public input: FormControl = new FormControl();
   public leagues: Array<LeagueModel> = [];
   public router: Router;
   public hasError: boolean;

   @Output() readonly leagueFound: EventEmitter<LeagueModel> = new EventEmitter<LeagueModel>();

   constructor(leagueService: LeagueService, router: Router) {
      this.leagueService = leagueService;
      this.router = router;
   }

   ngOnInit(): void {
      this.input.valueChanges
         .pipe(
            filter(query => query.length >= 1),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(value => this.leagueService.search(value).pipe(catchError(error => of([]))))
         )
         .subscribe({
            next: (results: Array<LeagueModel>) => {
               this.hasError = false;
               this.leagues = results;
               if (this.leagues.length === 1) {
                  this.input.setValue(this.leagues[0].name);
                  this.router.navigateByUrl(`/league/${this.leagues[0]._id}`);
               }
            },
            error: (error: any) => {
               this.hasError = true;
            }
         });
   }

}
