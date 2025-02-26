import {
  checkAuthStatus,
  getSpotifyToken,
  handleSpotifyCallback,
  logout,
  requestSpotifyAuthUrl,
} from "../controllers/authController.js";

import express from "express";
const authRouter = express.Router();

authRouter.get("/spotify-auth-url", requestSpotifyAuthUrl);
authRouter.post("/spotify-callback", handleSpotifyCallback);
authRouter.get("/status", checkAuthStatus);
authRouter.delete("/logout", logout);
authRouter.get("/spotify-token", getSpotifyToken);

export default authRouter;
