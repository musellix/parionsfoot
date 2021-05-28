import { Component, Input, OnInit } from '@angular/core';
import { PlayerModel } from '../models/player.model';

@Component({
   selector: 'xix-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

   @Input() player: PlayerModel;

   constructor() { }

   ngOnInit(): void {
   }

}
