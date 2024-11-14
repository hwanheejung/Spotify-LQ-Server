import User, { IUser } from "../../user/models/User.js";
import { decode } from "./jwtHelpers.js";

type verifyTokenResponse =
  | {
      tokenStatus: "EXPIRED" | "INVALID";
      user?: undefined;
    }
  | {
      tokenStatus: "VALID";
      user: IUser;
    };

const verifyToken = async (token: string): Promise<verifyTokenResponse> => {
  const decoded = decode(token);

  if (!decoded) {
    return { tokenStatus: "INVALID" };
  }

  const userId = decoded.userId;
  const user = await User.findById(userId);

  if (!user) {
    return { tokenStatus: "INVALID" };
  }

  if (user.token.atExpiry < new Date()) {
    return { tokenStatus: "EXPIRED" };
  }

  return { tokenStatus: "VALID", user };
};

export default verifyToken;
