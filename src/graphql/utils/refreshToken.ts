import axios from "axios";

const refreshToken = async (refreshToken: string) => {
  const url = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token || null,
    };
  } catch (error: any) {
    console.error(
      "Error refreshing Spotify token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to refresh Spotify token");
  }
};

export default refreshToken;
