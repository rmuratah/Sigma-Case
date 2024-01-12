import db from '../db/db'
import { NextFunction, Request, Response } from 'express';
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

//End Points
app.get("/users", async (req: Request, res: Response) => res.json(await db.getUsers()))
app.put("/users/:email", async (req: Request, res: Response) => res.json(await db.editUser(req.body, req.params.email)))
app.get("/users/:email", async (req: Request, res: Response) => res.json(await db.getUserByEmail(req.params.email)))
app.get("/tables", async (req: Request, res: Response) => res.json(await db.createTable()))
app.post("/users", async (req: Request, res: Response) => res.json(await db.createUsers()))
app.post("/permissions", async (req: Request, res: Response) => res.json(await db.createPermissions()))
app.post("/permissionsUser", async (req: Request, res: Response) => res.json(await db.createUserPermissionsRela()))

app.listen(process.env.PORT, () => console.log("App is running"));