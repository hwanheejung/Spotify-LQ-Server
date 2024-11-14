import jwt, { JwtPayload } from "jsonwebtoken";
import throwError from "../../../shared/utils/throwError";
import { ERROR } from "../../../shared/constants/error";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const decode = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded;
  } catch (error) {
    throwError(`${ERROR.INVALID_TOKEN}: ${error}`);
    return null;
  }
};
