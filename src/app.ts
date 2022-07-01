require("dotenv").config();
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

import express, { Request, Response, NextFunction, json } from "express";

const PORT = process.env.PORT || 2000;
const app = express();


app.use(
    cors({
        origin: [process.env.CLIENT_URL!, "http://localhost:3000"],
    })
);
app.use(json());


app.get('/', (req:Request, res:Response,next:NextFunction) => {
    res.send("Hello");
})

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

mongoose.connect("mongodb+srv://user:user@cluster0.7dpvr.mongodb.net/?retryWrites=true&w=majority" as string, {
})
    .then(() => {
        app.listen((PORT), () => {
            console.log(`Port started at ${PORT}`);
    })
    }).catch((e) => {
    console.log(e)
})