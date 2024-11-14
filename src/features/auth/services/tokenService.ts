import User, { IUser } from "../../user/models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtil.js";

export const saveUserAndTokens = async (
  email: string,
  spotifyTokens: { accessToken: string; refreshToken: string }
) => {
  let user: IUser | null = await User.findOne({ email });

  if (!user) {
    // Create a new user
    user = new User({
      email,
      token: {
        spotifyAccessToken: spotifyTokens.accessToken,
        spotifyRefreshToken: spotifyTokens.refreshToken,
        accessToken: "", // temp
        refreshToken: "", // temp
        atExpiry: new Date(), // temp
      },
    });

    await user.save();
  }

  const userId = user._id.toString();

  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  const atExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.token.spotifyAccessToken = spotifyTokens.accessToken;
  user.token.spotifyRefreshToken = spotifyTokens.refreshToken;
  user.token.accessToken = accessToken;
  user.token.refreshToken = refreshToken;
  user.token.atExpiry = atExpiry;

  await user.save();

  return { accessToken, refreshToken };
};
