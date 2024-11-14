import "dotenv/config";
import "./config/db.js";
import "../features/user/models/User.js";
import httpServer from "./server.js";

const PORT = 4000;

await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`✅ Server ready at: http://localhost:${PORT}`);
