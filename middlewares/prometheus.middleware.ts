import express from "express";
import client from "prom-client";
import responseTime from "response-time";

import { prometheusRegister } from "../config/prometheus";

export const prometheusMiddleware = express.Router();

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time is taken by req and res",
  labelNames: ["method", "route", "status_code"],
  buckets: [25, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000],
});

prometheusRegister.registerMetric(reqResTime);

prometheusMiddleware.use(
  responseTime((req, res, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);
