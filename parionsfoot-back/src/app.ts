import express from "express";
import cors from "cors";
import { DbConnexion } from "./dbConnexion";
import { LeagueModel, ILeague } from "./league";
import { ITeam, TeamModel } from "./team";
import { IPlayer, PlayerModel } from "./player";

export class App {

   // private expressApp;
   private expressApp: express.Application;

   private port: number = 8080;
   private mongoConnexion: DbConnexion;

   public constructor() {
      this.expressApp = express();

      // cors is for Access to XMLHttpRequest 
      this.expressApp.use(cors());
      this.expressApp.options('*', cors());

      this.defineRouteHandlers();
      this.mongoConnect();
   }

   private defineRouteHandlers(): void {
      this.expressApp.get("/", (req, res) => {
         res.send("HELLO EXPRESS SERVER")
      });

      // ---------- LEAGUE ----------
      this.expressApp.get("/leagues", async (req, res) => {
         console.log(`leagues - get --> list`);
         const model = new LeagueModel();
         const leagues: ILeague[] = await model.list();
         res.send(leagues);
      });

      this.expressApp.get("/league", async (req, res) => {
         console.log(`league - get --> read - id = ${req.query.id}`);
         const model = new LeagueModel();
         const id: string = req.query.id as string;
         const league: ILeague = await model.get(id);
         res.send(league);
      });

      this.expressApp.put("/league", async (req, res) => {
         console.log(`league - put --> create - params = ${JSON.stringify(req.query)}`);
         const model = new LeagueModel();
         const createdLeague: ILeague = await model.create(req.query);
         res.send(createdLeague);
      });

      this.expressApp.post("/league", async (req, res) => {
         console.log(`league - post --> update - params = ${JSON.stringify(req.query)}`);
         const model = new LeagueModel();
         const updatedLeague: ILeague = await model.update(req.query);
         res.send(updatedLeague);
      });

      this.expressApp.delete("/league", async (req, res) => {
         console.log(`league - delete --> delete - id = ${req.query.id}`);
         const model = new LeagueModel();
         const id: string = req.query.id as string;
         const deletedCount: number = await model.delete(id);
         res.send({deletedCount});
      });

      // ---------- TEAM ----------
      this.expressApp.get("/teams", async (req, res) => {
         console.log("teams - get --> list");
         const model = new TeamModel();
         const teams: ITeam[] = await model.list();
         res.send(teams);
      });

      this.expressApp.get("/team", async (req, res) => {
         console.log(`team - get --> read - id = ${req.query.id}`);
         const model = new TeamModel();
         const id: string = req.query.id as string;
         const team: ITeam = await model.get(id);
         res.send(team);
      });

      this.expressApp.put("/team", async (req, res) => {
         console.log(`team - put --> create - params = ${JSON.stringify(req.query)}`);
         const model = new TeamModel();
         const createdTeam: ITeam = await model.create(req.query);
         res.send(createdTeam);
      });

      this.expressApp.post("/team", async (req, res) => {
         console.log(`team - post --> update - params = ${JSON.stringify(req.query)}`);
         console.log(req.query);
         const model = new TeamModel();
         const updatedTeam: ITeam = await model.update(req.query);
         res.send(updatedTeam);
      });

      this.expressApp.delete("/team", async (req, res) => {
         console.log(`team - delete --> delete - id = ${req.query.id}`)
         const model = new TeamModel();
         const id: string = req.query.id as string;
         const deletedCount: number = await model.delete(id);
         res.send({deletedCount});
      });

      // ---------- PLAYER ----------
      this.expressApp.get("/players", async (req, res) => {
         console.log(`players - get --> list`)
         const model = new PlayerModel();
         const players: IPlayer[] = await model.list();
         res.send(players);
      });

      this.expressApp.get("/player", async (req, res) => {
         console.log(`player - get --> read - id = ${req.query.id}`)
         const model = new PlayerModel();
         const id: string = req.query.id as string;
         const player: IPlayer = await model.get(id);
         res.send(player);
      });

      this.expressApp.put("/player", async (req, res) => {
         console.log(`PLAYER - PUT --> create - params = ${JSON.stringify(req.query)}`)
         const model = new PlayerModel();
         const createdPlayer: IPlayer = await model.create(req.query);
         res.send(createdPlayer);
      });

      this.expressApp.post("/player", async (req, res) => {
         console.log(`player - post --> update - params = ${JSON.stringify(req.query)}`);
         const model = new PlayerModel();
         const updatedPlayer: IPlayer = await model.update(req.query);
         res.send(updatedPlayer);
      });

      this.expressApp.delete("/player", async (req, res) => {
         console.log(`player - delete --> delete - id = ${req.query.id}`);
         const model = new PlayerModel();
         const id: string = req.query.id as string;
         const deletedCount: number = await model.delete(id);
         res.send({deletedCount});
      });

      // start the express server
      this.expressApp.listen(this.port, () => {
         // tslint:disable-next-line:no-console
         console.log(`server started at http://localhost:${this.port}`);
      });
   }

   private async mongoConnect(): Promise<void> {
      this.mongoConnexion = new DbConnexion();
      await this.mongoConnexion.connect();
   }
}