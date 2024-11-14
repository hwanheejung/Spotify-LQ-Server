import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { GraphQLError } from "graphql";
import "../../core/config/db.js";
import verifyToken from "../../features/auth/helpers/verifyToken.js";
import { IUser } from "../../features/user/models/User.js";

export type MyContext = {
  user?: IUser;
};

export const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<MyContext> => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    // not logged in
    return {};
  }

  const { tokenStatus, user } = await verifyToken(token);

  if (tokenStatus === "EXPIRED") {
    throw new GraphQLError("Token expired", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
        reason: "TOKEN_EXPIRED",
      },
    });
  }

  if (tokenStatus === "INVALID") {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
        reason: "TOKEN_INVALID",
      },
    });
  }

  return { user };
};
