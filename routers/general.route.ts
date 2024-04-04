import express from "express";
import { generalController } from "../controllers";

const router = express.Router();

router.get("/", generalController.getHelloWorld);

export default router;
