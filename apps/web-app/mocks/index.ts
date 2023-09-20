const isDev = process.env.NODE_ENV === "development";

async function initMocks() {
  if (isDev) {
    if (typeof window === "undefined") {
      const { server } = await import("./server");

      server.listen();
    } else {
      // TODO: To be fixed when MSW is updated: https://github.com/mswjs/msw/pull/1399
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { worker } = require("./browser");

      worker.start();
    }
  }
}

initMocks();

export {};
