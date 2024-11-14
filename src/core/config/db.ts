import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = (error: Error) => {
  console.log("❌ Error on DB Connection:", error);
};

db.on("error", handleError);
db.once("open", handleOpen);
