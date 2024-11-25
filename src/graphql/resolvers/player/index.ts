import { getAvailableDevices } from "./getAvailableDevices.js";
import { transferPlayback } from "./transferPlayback.js";

export const playerResolver = {
  Query: { getAvailableDevices },
  Mutation: { transferPlayback },
};
