import * as mongoose from 'mongoose';
import { IPlayer } from './player';

export interface ITeam extends mongoose.Document {
   name: string;
   thumbnail: string;
   players: IPlayer[];
}

const TeamSchema = new mongoose.Schema({
   name: { type: String, required: true },
   thumbnail: { type: String, required: true },
   players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }],
});

const Team = mongoose.model<ITeam>('Team', TeamSchema);

export class TeamModel {

   /**
   * Used to list teams
   * @returns an array of all the teams
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
    * Used to get a league by id
    * @param teamId the team id
    * @returns a team
    */
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
    * Used to register a new team
    * @param params ITeam object
    * @returns the new team created
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
    * Used to update an existing team
    * @param params ITeam object with id value
    * @returns the team updated
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
    * Used to delete an existing team
    * @param id the team id
    * @returns the delete result quantity
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