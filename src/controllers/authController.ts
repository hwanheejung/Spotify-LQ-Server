import axios from "axios";
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

export const getUserInfo = async (token: string) => {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
};

export const handleSpotifyCallback = async (req: Request, res: Response) => {
  const { code } = req.body;

  const authOptions = new URLSearchParams();
  authOptions.append("code", code);
  authOptions.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI!);
  authOptions.append("grant_type", "authorization_code");

  const authHeader =
    "Basic " +
    Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      authOptions,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authHeader,
        },
        responseType: "text",
      }
    );

    const data = JSON.parse(response.data);

    const { access_token, refresh_token } = data;
    // const user = await getUserInfo(access_token);

    res
      .status(200)
      .json({ accessToken: access_token, refreshToken: refresh_token });
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};
