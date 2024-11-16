import "dotenv/config";
import "./config/db.js";
import "../features/user/models/User.js";
import httpsServer from "./server.js";

const PORT = 4000;

await new Promise<void>((resolve) =>
  httpsServer.listen({ port: PORT }, resolve)
);
console.log(`✅ Server ready at: https://localhost:${PORT}`);
