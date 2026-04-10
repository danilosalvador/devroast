import { createHTTPHandler } from "@trpc/server/adapters/node-http";
import { createServer } from "node:http";
import { appRouter } from "./routers/_app";
import { createTRPCContext } from "./trpc";

const handler = createHTTPHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

const server = createServer((req, res) => {
  // CORS for development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle tRPC requests
  if (req.url?.startsWith("/trpc")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    req.url = url.pathname.replace("/trpc", "");
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("🚀 tRPC server running on http://localhost:3000");
});
