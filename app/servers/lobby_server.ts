import { existsSync } from "fs";
import staticServer from "@fastify/static";
import createServer from "fastify";
import type { FastifyInstance } from "fastify";
import { ApplicationServer } from "./application_server";

/**
 * LobbyServer (HTTP Server)
 */
export class LobbyServer extends ApplicationServer {
  readonly assetsDir = "/app/.output/assets";
  readonly server: FastifyInstance;

  /**
   * Initialize server.
   * @param host host address
   * @param port port number
   */
  constructor(host: string, port: number) {
    super(host, port);
    this.server = createServer();
  }

  /**
   * Start server.
   */
  start(): void {
    if (!existsSync(`${this.assetsDir}/index.json`)) {
      throw new Error("Asset is not built. Please execute `yarn run build`");
    }

    this.server.register(staticServer, {
      root: this.assetsDir,
      prefix: "/assets/"
    });

    this.server.listen({ port: this.port, host: this.host }, (err) => {
      if (err) throw err;

      LOGGER.info(`Listen http://${this.host}:${this.port}`);
    });
  }
}
