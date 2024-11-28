import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "./User";

export interface ISession extends Document {
  sessionId: string;
  userId: Types.ObjectId | IUser;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<ISession>("Session", SessionSchema);
