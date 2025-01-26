import express from "express";
import { fetchImages, fetchLastImage, uploadFile } from "../controllers/fileCon.js";
import upload from "../middlewares/uploadMiddleware.js";
// import userAuth from "../middlewares/userAuth.js";
const fileRouter = express.Router();

fileRouter.post("/upload",  upload.single("image"), uploadFile);
fileRouter.get("/images/", fetchImages);
fileRouter.get("/lastImage", fetchLastImage);

export default fileRouter;
