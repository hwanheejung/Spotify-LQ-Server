import axios from "axios";
import { ERROR } from "../../../lib/constants/error.js";
import { IUser } from "../../../models/User.js";
import { SPOTIFY_BASE } from "../../../lib/constants/spotify.js";

export const getArtist = async (
  _: unknown,
  { artistId }: { artistId: string },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  try {
    const response = await axios.get(`${SPOTIFY_BASE}/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${user.spotifyToken.accessToken}`,
      },
    });

    const data = response.data;

    return {
      external_urls: data.external_urls || null,
      followers: data.followers || null,
      genres: data.genres || [],
      href: data.href || null,
      id: data.id || null,
      images: data.images || [],
      name: data.name || null,
      popularity: data.popularity || null,
      type: data.type || null,
      uri: data.uri || null,
    };
  } catch (error) {
    console.error("Error getting artist", error);
    throw new Error("Failed to fetch artist from Spotify API");
  }
};
