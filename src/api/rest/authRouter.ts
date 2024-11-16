import {
  checkAuthStatus,
  handleSpotifyCallback,
  requestSpotifyAuthUrl,
} from "../../features/auth/controllers/authController.js";

import express from "express";
const authRouter = express.Router();

authRouter.get("/spotify-auth-url", requestSpotifyAuthUrl);
authRouter.post("/spotify-callback", handleSpotifyCallback);
authRouter.get("/status", checkAuthStatus);

export default authRouter;
