import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { notFoundError, errorHandler } from "./middlewares/error-handler.js";
import productRoute from './routes/product.js'



const app = express();
app.use(cors());
app.use(morgan("dev")); // Utiliser morgan
app.use(express.json());
const hostname = "localhost"; //avant lancer docker changer hostname=0.0.0.0
const connectMongo = "127.0.0.1"; // avant lancer docker changer connectMongo to name service mongo in file docker-compose.yaml examen-mongo
const port = process.env.PORT || 9090;
const databaseName = "Dyslire";

app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded

mongoose.set("strictQuery", true);

mongoose
  .connect(`mongodb://${connectMongo}:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/img", express.static("public/images"));

app.use("/", productRoute);


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//run < docker compose up > pour lancer docker
//pour annuler run < docker compose down > rajja3 kima ken
