import * as mongoose from 'mongoose';
import { ITeam } from './team';

export interface ILeague extends mongoose.Document {
   name: string;
   sport: string;
   teams: ITeam[];
}

export const LeagueSchema = new mongoose.Schema({
   name: { type: String, required: true },
   sport: { type: String, required: true },
   teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }],
});

const League = mongoose.model<ILeague>('League', LeagueSchema);
export default League;

export class LeagueModel {

   /**
    * 
    * @returns 
    */
   public list(): Promise<ILeague[]> {
      console.log(`League :: list`);
      return new Promise<ILeague[]>(async (resolve) => {
         League
            .find()
            .exec((err: mongoose.NativeError, leagues: ILeague[]) => {
               if (err) { console.log(err); }
               resolve(leagues);
            });
      });
   }

   /**
    * 
    * @param leagueId 
    * @returns 
    */
   // TODO mettre ce type d'ecriture sur toutes les methodes
   public get(leagueId: string): Promise<ILeague> {
      console.log(`League :: get`);
      return new Promise<ILeague>(async (resolve) => {
         League
            .findOne()
            .populate('teams')
            .where({ _id: leagueId })
            .exec((err: mongoose.NativeError, league: ILeague) => {
               if (err) { console.log(err); }
               resolve(league);
            });
      });
   }

   /**
    * 
    * @param params 
    * @returns 
    */
   // TODO typer params en ILeague
   public create(params): Promise<ILeague> {
      console.log(`League :: create`);
      return new Promise<ILeague>(async (resolve) => {
         const league: ILeague = new League({
            name: params.name,
            sport: params.sport,
            teams: params.teams
         });

         league.save((err: mongoose.NativeError, createdLeague: ILeague) => {
            if (err) { console.log(err); }
            resolve(createdLeague);
         });
      })
   }

   /**
    * 
    * @param params 
    * @returns 
    */
   // TODO typer params en ILeague
   public update(params): Promise<ILeague> {
      console.log(`League :: update`);
      return new Promise<ILeague>(async (resolve) => {
         // League.findOne({ _id: params.id }, null, null, (err: mongoose.NativeError, league: ILeague) => {
         //    if (err) { console.log(`findOne : ${err}`); }

         League.findOne()
            .where({ _id: params.id })
            .exec((err: mongoose.NativeError, league: ILeague) => {
               if (err) { console.log(err); }

               league.name = params.name;
               league.sport = params.sport;
               league.teams = params.teams;

               league.save((err: mongoose.NativeError, updatedLeague: ILeague) => {
                  if (err) { console.log(err); }
                  resolve(updatedLeague);
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
      console.log(`League :: delete`);
      return new Promise<number>((resolve) => {
         League.deleteOne()
            .where({ _id: id })
            .exec((err: mongoose.NativeError, res: any) => {
               if (err) { console.log(err); }
               resolve(res.deletedCount);
            });
      });
   }

}