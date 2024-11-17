import crypto from "crypto";
import Session from "../models/Session.js";
import User, { IUser } from "../models/User.js";

export const saveUserAndTokens = async (
  email: string,
  spotifyTokens: { accessToken: string; refreshToken: string }
): Promise<{ sessionId: string }> => {
  let user: IUser | null = await User.findOne({ email });

  if (!user) {
    user = await createNewUser(email, spotifyTokens);
  } else {
    await updateUser(user, spotifyTokens);
  }

  const { sessionId } = await createSession(user);

  return { sessionId };
};

const createNewUser = async (
  email: string,
  spotifyTokens: { accessToken: string; refreshToken: string }
): Promise<IUser> => {
  const newUser = new User({
    email,
    spotifyToken: {
      accessToken: spotifyTokens.accessToken,
      refreshToken: spotifyTokens.refreshToken,
    },
  });
  await newUser.save();
  return newUser;
};

const updateUser = async (
  user: IUser,
  spotifyTokens: { accessToken: string; refreshToken: string }
) => {
  user.spotifyToken.accessToken = spotifyTokens.accessToken;
  user.spotifyToken.refreshToken = spotifyTokens.refreshToken;

  await user.save();
};

const createSession = async (user: IUser): Promise<{ sessionId: string }> => {
  const userId = user._id.toString();

  await Session.deleteMany({ userId });

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const session = new Session({
    sessionId,
    userId,
    expiresAt,
  });
  await session.save();

  return { sessionId };
};
