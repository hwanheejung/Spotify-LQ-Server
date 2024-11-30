import { getAvailableDevices } from "./getAvailableDevices.js";
import { getQueue } from "./getQueue.js";
import { startResumePlayback } from "./startResumePlayback.js";
import { transferPlayback } from "./transferPlayback.js";

export const playerResolver = {
  Query: { getAvailableDevices, getQueue },
  Mutation: { transferPlayback, startResumePlayback },
};
