import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  token: {
    spotifyAccessToken: string; // SAT
    spotifyRefreshToken: string; // SRT
    accessToken: string; // AT
    refreshToken: string; // RT
    atExpiry: Date; // AT expiry
  };
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  token: {
    spotifyAccessToken: { type: String, required: true },
    spotifyRefreshToken: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    atExpiry: { type: Date, required: true },
  },
});

export default mongoose.model<IUser>("User", UserSchema);
