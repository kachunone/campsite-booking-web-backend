import express, { Request, Response, NextFunction } from "express";
import CampsiteController from "../controllers/campsite-controllers";

const router = express.Router();

router.get("/", CampsiteController.getCampsites);

router.get("/write", CampsiteController.writeCampsites);

export default router;
