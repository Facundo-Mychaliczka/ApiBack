import express, {Express} from "express"
import cors from "cors"
import authRoutes from "../routes/auth.route"
import { dbConection } from "../database/config"




export class Server {

    app: Express
    port: string | number | undefined
    authPath: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath= "/auth";

        this.conectDB();
        this.middlewares();

        this.routes();
    }

    async conectDB(): Promise<void> {
        await dbConection();
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto ${this.port}`);  
        })
    }
}
