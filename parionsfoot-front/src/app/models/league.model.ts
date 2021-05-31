import { TeamModel } from "./team.model";

export interface LeagueModel {
  _id: string;
  name: string;
  sport: string;
  teams: TeamModel[];
}
