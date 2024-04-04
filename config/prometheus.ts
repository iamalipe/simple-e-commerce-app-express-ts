import { Request, Response } from "express";
import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
export const prometheusRegister = new Registry();

collectDefaultMetrics({ register: prometheusRegister });

export const metricsRoute = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", prometheusRegister.contentType);
  const metrics = await prometheusRegister.metrics();
  res.send(metrics);
};
