import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  spotifyToken: {
    accessToken: string;
    refreshToken: string;
  };
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  spotifyToken: {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
});

export default mongoose.model<IUser>("User", UserSchema);
