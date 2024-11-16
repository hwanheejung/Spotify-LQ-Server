import mongoose, { Document, Schema, Types } from "mongoose";

interface ISession extends Document {
  sessionId: string;
  userId: Types.ObjectId;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<ISession>("Session", SessionSchema);
