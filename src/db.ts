import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/spotify-lt");
const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = (error: Error) => {
  console.log("❌ Error on DB Connection:", error);
};

db.on("error", handleError);
db.once("open", handleOpen);
