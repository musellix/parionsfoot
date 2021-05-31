import { PlayerModel } from "./player.model";

export interface TeamModel {
   _id: string;
   name: string;
   thumbnail: string;
   players: PlayerModel[];
}
