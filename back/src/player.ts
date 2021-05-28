import * as mongoose from 'mongoose';

interface ISignin {
   amount: number;
   currency: string;
}

export interface IPlayer extends mongoose.Document {
   name: string;
   position: string;
   thumbnail: string;
   signin: ISignin;
   born: Date;
}

export const PlayerSchema = new mongoose.Schema({
   name: { type: String, required: true },
   position: { type: String, required: true },
   thumnail: { type: String, required: true },
   signin: { type: { amount: Number, currency: String }, required: false },
   born: { type: Date, required: true },
});

const Player = mongoose.model<IPlayer>('Player', PlayerSchema);
export default Player;

export class PlayerModel {

   /**
    * 
    * @returns 
    */
   public list(): Promise<IPlayer[]> {
      console.log(`Player :: list`);
      return new Promise<IPlayer[]>(async (resolve) => {
         Player
            .find()
            .where({})
            .exec((err: mongoose.NativeError, teams: IPlayer[]) => {
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
   public get(teamId: string): Promise<IPlayer> {
      console.log(`Player :: get`);
      return new Promise<IPlayer>(async (resolve) => {
         Player
            .findOne()
            .where({ _id: teamId })
            .exec((err: mongoose.NativeError, team: IPlayer) => {
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
   // TODO typer params en IPlayer
   public create(params): Promise<IPlayer> {
      console.log(`Player :: create`);
      return new Promise<IPlayer>(async (resolve) => {
         const team: IPlayer = new Player({
            name: params.name,
            sport: params.sport,
            teams: params.teams
         });

         team.save((err: mongoose.NativeError, createdPlayer: IPlayer) => {
            if (err) { console.log(err); }
            resolve(createdPlayer);
         });
      })
   }

   /**
    * 
    * @param params 
    * @returns 
    */
   // TODO typer params en IPlayer
   public update(params): Promise<IPlayer> {
      console.log(`Player :: update`);
      return new Promise<IPlayer>(async (resolve) => {
         Player.findOne()
            .where({ _id: params.id })
            .exec((err: mongoose.NativeError, team: IPlayer) => {
               if (err) { console.log(err); }

               team.name = params.name;
               team.position = params.position;
               team.thumbnail = params.thumbnail;
               team.signin = params.signin;
               team.born = params.born;

               team.save((err: mongoose.NativeError, updatedPlayer: IPlayer) => {
                  if (err) { console.log(err); }
                  resolve(updatedPlayer);
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
      console.log(`Player :: delete`);
      return new Promise<number>((resolve) => {
         Player.deleteOne()
            .where({ _id: id })
            .exec((err: mongoose.NativeError, res: any) => {
               if (err) { console.log(err); }
               resolve(res.deletedCount);
            });
      });
   }

}