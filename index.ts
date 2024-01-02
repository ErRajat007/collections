import express from "express";
import { Request, Response } from 'express';
import bodyParser from "body-parser";
import './config/mongo'
require('dotenv').config();

const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const documents=require('./routes/document')
const authRouter=require('./routes/authRoutes')

const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',authRouter)
app.use('/user',userRoutes);
app.use('/project', projectRoutes);
app.use('/document',documents)

let Port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ status: true });
});

app.listen(Port,()=> {
  console.log(`Server is running on port ${Port}`);
})