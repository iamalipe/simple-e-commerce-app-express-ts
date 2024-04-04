import { Request, Response } from "express";

const getHelloWorld = async (req: Request, res: Response) => {
  res.send({ message: "Server is working." });
};

export const generalController = {
  getHelloWorld,
};
