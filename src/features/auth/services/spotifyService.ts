import axios from "axios";

export const getSpotifyAuthUrl = (): string => {
  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const config = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
  };

  authUrl.search = new URLSearchParams(config).toString();
  return authUrl.toString();
};

export const exchangeCodeForToken = async (code: string) => {
  const authOptions = new URLSearchParams();
  authOptions.append("code", code);
  authOptions.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI!);
  authOptions.append("grant_type", "authorization_code");

  const authHeader =
    "Basic " +
    Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

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

  return JSON.parse(response.data);
};

export const getSpotifyUserData = async (spotifyAccessToken: string) => {
  const result = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${spotifyAccessToken}` },
  });

  return result.data;
};
