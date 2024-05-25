import express, { Router } from "express";
import { uploadFile } from "../controllers/upload.controller";

const uploadRouter: Router = express.Router();

uploadRouter.route("/").post(uploadFile);

export default uploadRouter;
