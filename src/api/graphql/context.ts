import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import "../../core/config/db.js";
import User from "../../features/user/models/User.js";

export interface MyContext {
  spotifyAccessToken: string;
}

export const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<MyContext> => {
  const userId = await getUserFromReq(req);

  const user = await User.findById(userId);
  return { spotifyAccessToken: user?.token.spotifyAccessToken! };
};

const getUserFromReq = async (
  req: ExpressContextFunctionArgument["req"]
): Promise<string> => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const userId = "decoded_user_id";
  return userId;
};
