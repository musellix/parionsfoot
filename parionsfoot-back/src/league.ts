import * as mongoose from 'mongoose';
import { ITeam } from './team';

export interface ILeague extends mongoose.Document {
   name: string;
   sport: string;
   teams: ITeam[];
}

const LeagueSchema = new mongoose.Schema({
   name: { type: String, required: true },
   sport: { type: String, required: true },
   teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }],
});

const League = mongoose.model<ILeague>('League', LeagueSchema);

export class LeagueModel {

   /**
    * Used to list leagues
    * @returns an array of all the leagues
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
    * Used to get a league by id
    * @param id the league id
    * @returns a league
    */
   public get(id: string): Promise<ILeague> {
      console.log(`League :: get`);
      return new Promise<ILeague>(async (resolve) => {
         League
            .findOne()
            .populate('teams')
            .where({ _id: id })
            .exec((err: mongoose.NativeError, league: ILeague) => {
               if (err) { console.log(err); }
               resolve(league);
            });
      });
   }

   /**
    * Used to register a new league
    * @param params ILeague object
    * @returns the new league created
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
    * Used to update an existing league
    * @param params ILeague object with id value
    * @returns the league updated
    */
   // TODO typer params en ILeague
   public update(params): Promise<ILeague> {
      console.log(`League :: update`);
      return new Promise<ILeague>(async (resolve) => {
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
    * Used to delete an existing league
    * @param id the league id
    * @returns the delete result quantity
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