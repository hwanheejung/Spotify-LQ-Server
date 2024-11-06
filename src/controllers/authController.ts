import { Request, Response } from "express";
import {
  exchangeCodeForToken,
  getSpotifyAuthUrl,
  getUserInfo,
} from "../services/spotifyService.js";
import { saveUserAndTokens } from "../services/tokenService.js";

export const requestSpotifyAuthUrl = (req: Request, res: Response) => {
  const url = getSpotifyAuthUrl();
  res.json({ url });
};

export const handleSpotifyCallback = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const {
      access_token: spotifyAccessToken,
      refresh_token: spotifyRefreshToken,
    } = await exchangeCodeForToken(code);

    const userInfo = await getUserInfo(spotifyAccessToken);
    const { email } = userInfo;

    const { accessToken, refreshToken } = await saveUserAndTokens(email, {
      accessToken: spotifyAccessToken,
      refreshToken: spotifyRefreshToken,
    });

    res.status(200).json({ email, accessToken, refreshToken });
  } catch (error) {
    console.error("Error at handleSpotifyCallback:", error);
    res.status(500).json({ error: "Failed to handle Spotify callback" });
  }
};
