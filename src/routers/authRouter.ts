import {
  getSpotifyAuthUrl,
  handleSpotifyCallback,
} from "../controllers/authController.js";

import express from "express";
const authRouter = express.Router();

authRouter.get("/spotify-url", getSpotifyAuthUrl);
authRouter.post("/spotify/callback", handleSpotifyCallback);

export default authRouter;
