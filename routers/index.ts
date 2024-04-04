import express, { Request, Response } from "express";

import generalRouter from "./general.route";

export const mainRouter = express.Router();

mainRouter.use("/", generalRouter);
