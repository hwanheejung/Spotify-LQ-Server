import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import "../../core/config/db.js";
import User from "../../features/user/models/User.js";
import { decode } from "../../features/auth/utils/jwtUtil.js";
import throwError from "../../shared/utils/throwError.js";
import { ERROR } from "../../shared/constants/error.js";

export interface MyContext {
  spotifyAccessToken: string;
}

export const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<MyContext> => {
  const userId = await getUserFromReq(req);
  if (!userId) return { spotifyAccessToken: "" };

  const user = await User.findById(userId);
  if (!user) return { spotifyAccessToken: "" };

  return { spotifyAccessToken: user.token.spotifyAccessToken };
};

const getUserFromReq = async (
  req: ExpressContextFunctionArgument["req"]
): Promise<string | null> => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return null;

  const decoded = decode(token);

  if (!decoded) {
    throwError(ERROR.INVALID_TOKEN);
    return null;
  }

  return decoded.userId;
};
