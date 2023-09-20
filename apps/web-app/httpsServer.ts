import { loadEnvConfig } from "@next/env";
import fs from "fs";
import { createServer } from "https";
import next from "next";
import { parse } from "url";

const PORT = 3000;

const HTTPS_OPTIONS = {
  key: fs.readFileSync("./certificates/localhost.key"),
  cert: fs.readFileSync("./certificates/localhost.crt"),
};

const isDev = process.env.NODE_ENV === "development";

function loadNextEnvConfig() {
  loadEnvConfig(process.cwd(), isDev);
}

async function startNextAppWithHttpsServer() {
  const nextApp = next({ dev: isDev });
  const nextHandler = nextApp.getRequestHandler();

  try {
    await nextApp.prepare();

    createServer(HTTPS_OPTIONS, (req, res) => {
      if (req.url) {
        const parsedUrl = parse(req.url, true);
        nextHandler(req, res, parsedUrl);
      }
    }).listen(PORT, () => {
      console.log(
        `> HTTPS server for Next.js application started on https://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.error(
      "> Error starting HTTPS server for Next.js application:",
      err
    );
  }
}

function main() {
  loadNextEnvConfig();
  startNextAppWithHttpsServer();
}

main();
