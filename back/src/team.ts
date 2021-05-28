import * as mongoose from 'mongoose';
import { IPlayer } from './player';

export interface ITeam extends mongoose.Document {
   name: string;
   thumbnail: string;
   players: IPlayer[];
}

export const TeamSchema = new mongoose.Schema({
   name: { type: String, required: true },
   thumbnail: { type: String, required: true },
   players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }],
});

const Team = mongoose.model<ITeam>('Team', TeamSchema);
export default Team;

export class TeamModel {

    /**
    * 
    * @returns 
    */
     public list(): Promise<ITeam[]> {
      console.log(`Team :: list`);
      return new Promise<ITeam[]>(async (resolve) => {
         Team
            .find()
            .where({})
            .exec((err: mongoose.NativeError, teams: ITeam[]) => {
               if (err) { console.log(err); }
               resolve(teams);
            });
      });
   }

   /**
    * 
    * @param teamId 
    * @returns 
    */
   // TODO mettre ce type d'ecriture sur toutes les methodes
   public get(teamId: string): Promise<ITeam> {
      console.log(`Team :: get`);
      return new Promise<ITeam>(async (resolve) => {
         Team
            .findOne()
            .populate('players')
            .where({ _id: teamId })
            .exec((err: mongoose.NativeError, team: ITeam) => {
               if (err) { console.log(err); }
               resolve(team);
            });
      });
   }

   /**
    * 
    * @param params 
    * @returns 
    */
   // TODO typer params en ITeam
   public create(params): Promise<ITeam> {
      console.log(`Team :: create`);
      return new Promise<ITeam>(async (resolve) => {
         const team: ITeam = new Team({
            name: params.name,
            sport: params.sport,
            teams: params.teams
         });

         team.save((err: mongoose.NativeError, createdTeam: ITeam) => {
            if (err) { console.log(err); }
            resolve(createdTeam);
         });
      })
   }

   /**
    * 
    * @param params 
    * @returns 
    */
   // TODO typer params en ITeam
   public update(params): Promise<ITeam> {
      console.log(`Team :: update`);
      return new Promise<ITeam>(async (resolve) => {
         Team.findOne()
            .where({ _id: params.id })
            .exec((err: mongoose.NativeError, team: ITeam) => {
               if (err) { console.log(err); }

               team.name = params.name;
               team.thumbnail = params.thumbnail;
               team.players = params.players;

               team.save((err: mongoose.NativeError, updatedTeam: ITeam) => {
                  if (err) { console.log(err); }
                  resolve(updatedTeam);
               });
            });
      });
   }

   /**
    * 
    * @param id 
    * @returns 
    */
   public delete(id: string): Promise<number> {
      console.log(`Team :: delete`);
      return new Promise<number>((resolve) => {
         Team.deleteOne()
            .where({ _id: id })
            .exec((err: mongoose.NativeError, res: any) => {
               if (err) { console.log(err); }
               resolve(res.deletedCount);
            });
      });
   }

}