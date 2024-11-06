import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtil.js";

export const saveUserAndTokens = async (
  email: string,
  spotifyTokens: { accessToken: string; refreshToken: string }
) => {
  const atExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      token: {
        spotifyAccessToken: spotifyTokens.accessToken,
        spotifyRefreshToken: spotifyTokens.refreshToken,
        accessToken,
        refreshToken,
        atExpiry,
      },
    });
  } else {
    user.token.spotifyAccessToken = spotifyTokens.accessToken;
    user.token.spotifyRefreshToken = spotifyTokens.refreshToken;
    user.token.accessToken = accessToken;
    user.token.refreshToken = refreshToken;
    user.token.atExpiry = atExpiry;
  }

  await user.save();
  return { accessToken, refreshToken };
};
