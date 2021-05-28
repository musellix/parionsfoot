import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { LeaguesearchComponent } from './leaguesearch/leaguesearch.component';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
   declarations: [
      AppComponent,
      LeaguesearchComponent,
      LeagueComponent,
      TeamComponent,
      PlayerComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(ROUTES),
      ReactiveFormsModule
   ],
   providers: [
      Title
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
