import { ISession } from "../../models/Session.js";

export const extendSession = async (session: ISession) => {
  const now = new Date();
  const timeUntilExpiration = session.expiresAt.getTime() - now.getTime();

  const EXTEND_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
  if (timeUntilExpiration >= EXTEND_THRESHOLD_MS) return;

  // Extend session expiration by 30 minutes
  const newExpiresAt = new Date();
  newExpiresAt.setMinutes(newExpiresAt.getMinutes() + 30);
  session.expiresAt = newExpiresAt;
  await session.save();

  console.log(
    `Session extended: new expiration: ${newExpiresAt.toISOString()}`
  );
};
