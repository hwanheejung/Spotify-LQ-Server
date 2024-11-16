import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { GraphQLError } from "graphql";
import "../../core/config/db.js";
import Session from "../../features/user/models/Session.js";
import { IUser } from "../../features/user/models/User.js";

export type MyContext = {
  user?: IUser;
};

export const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<MyContext> => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) return {};

    const session = await Session.findOne({ sessionId }).populate<{
      userId: IUser;
    }>("userId");
    if (!session || session.expiresAt < new Date()) {
      throw new GraphQLError("Session expired or invalid", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }

    const user = session.userId as IUser;

    return { user };
  } catch (error) {
    console.error("Error in context: ", error);
    throw new GraphQLError("Internal server error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
