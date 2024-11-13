import "dotenv/config";
import "./config/db.js";
import "./models/User.js";
import app from "./server.js";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Server ready at: http://localhost:${PORT}`);
});
