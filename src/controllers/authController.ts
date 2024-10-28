import { Request, Response } from "express";

export const getSpotifyAuthUrl = (req: Request, res: Response) => {
  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const config = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
  };

  authUrl.search = new URLSearchParams(config).toString();

  res.json({ url: authUrl.toString() });
};

export const handleSpotifyCallback = (req: Request, res: Response) => {
  const { code } = req.body;
};
