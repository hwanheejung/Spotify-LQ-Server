import { Request, Response } from "express";
import { saveUserAndTokens } from "../services/tokenService.js";
import { spotifyService } from "../services/spotifyService.js";

export const requestSpotifyAuthUrl = (req: Request, res: Response) => {
  const url = spotifyService.getSpotifyAuthUrl();
  res.json({ url });
};

export const handleSpotifyCallback = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const {
      access_token: spotifyAccessToken,
      refresh_token: spotifyRefreshToken,
    } = await spotifyService.exchangeCodeForToken(code);

    const userInfo = await spotifyService.getSpotifyUserData(
      spotifyAccessToken
    );
    const { email, display_name, images, product, country } = userInfo;

    const { sessionId } = await saveUserAndTokens(email, {
      accessToken: spotifyAccessToken,
      refreshToken: spotifyRefreshToken,
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        email,
        display_name,
        images,
        product,
        country,
      },
    });
  } catch (error) {
    console.error("Error at handleSpotifyCallback:", error);
    res.status(500).json({ error: "Failed to handle Spotify callback" });
  }
};
