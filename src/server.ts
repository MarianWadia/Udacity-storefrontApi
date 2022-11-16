import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import Client from "./database";
import productRoutes from "./handlers/productHandler";
import userRoutes from "./handlers/userHandler";
import orderRoutes from "./handlers/orderHandler";
import dashboardRoutes from "./handlers/dashboardHandler";


export const app: express.Application = express();
const address = "0.0.0.0:5000";

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

// testing database 
Client.connect().then(Client=>{
  return Client
  .query('SELECT NOW()')
  .then((res) =>{
    Client.release();
    console.log(res.rows);
  }).catch((error) =>{
    Client.release();
    console.log(error);
  })

  }
)

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});
