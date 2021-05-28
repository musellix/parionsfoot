import mongoose from 'mongoose';

export class DbConnexion {

    public async connect(): Promise<void> {
        console.log(`DbConnexion :: connect`);
        return new Promise<void>(async (resolve) => {
            const url = 'mongodb://localhost:27017'
            const dbName = 'parionsfoot';

            await mongoose.connect(`${url}/${dbName}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            mongoose.connection.on("error", (e) => {
                console.log(`erreur de connexion à la base de donnees - ${e}`)
            });
            mongoose.connection.on("open", () => {
                console.log("Connecté à MongoDB");
            })
        })
    }

    public close(): void {
        // this.client.close();
    }

}