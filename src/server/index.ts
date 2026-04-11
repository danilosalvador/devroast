import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers/_app";
import { createTRPCContext } from "./trpc";

const server = createHTTPServer({
  router: appRouter,
  createContext: createTRPCContext,
  middleware: (req, res, next) => {
    // CORS for development
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "content-type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    next();
  },
});

server.listen(3000, () => {
  console.log("🚀 tRPC server running on http://localhost:3000");
});
