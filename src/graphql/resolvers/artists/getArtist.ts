import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";

export const getArtist = async (
  _: unknown,
  { artistId }: { artistId: string },
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }
  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios.get(`/artists/${artistId}`);

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
  } catch (error: any) {
    throwError(`Error getting artist: ${error.message}`);
  }
};
