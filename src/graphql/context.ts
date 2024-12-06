import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { GraphQLError } from "graphql";
import "../core/config/db.js";
import Session from "../models/Session.js";
import { IUser } from "../models/User.js";
import { extendSession } from "./utils/extendSession.js";
import { spotifyAxios } from "./utils/spotifyAxios.js";

export type MyContext =
  | {
      isAuthenticated: true;
      user: IUser;
      spotifyAxios: ReturnType<typeof spotifyAxios>;
    }
  | {
      isAuthenticated: false;
    };

export const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<MyContext> => {
  try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) return { isAuthenticated: false };

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
    await extendSession(session);

    return { isAuthenticated: true, user, spotifyAxios: spotifyAxios(user) };
  } catch (error) {
    console.error("Error in context: ", error);
    throw new GraphQLError("Internal server error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
