export interface PlayerModel {
   _id: string;
   name: string;
   position: string;
   thumbnail: string;
   signin: ISignin;
   born: Date;
}

interface ISignin {
   amount: number;
   currency: string;
}
