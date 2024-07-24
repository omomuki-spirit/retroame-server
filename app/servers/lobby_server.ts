import { existsSync } from "fs";
import staticServer from "@fastify/static";
import createServer from "fastify";
import type { FastifyInstance, FastifyRequest } from "fastify";
import createSession from "../interactions/sessions/create_session";
import createUser from "../interactions/users/create_user";
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
    this.mountAssetServer();
    this.mountApiServer();

    this.server.setErrorHandler((error, request, reply) => {
      LOGGER.error({
        request: {
          method: request.method,
          path:   request.url,
          body:   request.body,
          ip:     request.socket.remoteAddress,
          port:   request.socket.remotePort
        },
        error: {
          message: error.message,
          stack:   error.stack
        }
      }, "Unhandled Exception.");
      reply.status(500).send({ ok: false, error: { type: "server", code: "error", options: {} } });
    });

    this.server.listen({ port: this.port, host: this.host }, (err) => {
      if (err) throw err;

      LOGGER.info(`Listen http://${this.host}:${this.port}`);
    });
  }

  /**
   * Mount Asset Server
   */
  private mountAssetServer(): void {
    if (!existsSync(`${this.assetsDir}/index.json`)) {
      throw new Error("Asset is not built. Please execute `yarn run build`");
    }

    this.server.register(staticServer, {
      root:   this.assetsDir,
      prefix: "/assets/"
    });
  }

  /**
   * Mount API Server
   */
  private mountApiServer(): void {
    this.server.post("/api/v1/user", async (request, reply) => {
      const params = this.getParams(request);
      const result = await createUser({
        name:          params.name || "",
        loginId:       params.loginId || "",
        loginPassword: params.loginPassword || ""
      });

      if (result.error) {
        reply.status(400).send({ ok: false, error: result.error });
      } else {
        LOGGER.info(`CreateUser id:${result.value.id} ip:${request.socket.remoteAddress} port:${request.socket.remotePort}`);
        reply.status(200).send({ ok: true });
      }
    });

    this.server.post("/api/v1/session", async (request, reply) => {
      const params = this.getParams(request);
      const result = await createSession({
        loginId:       params.loginId || "",
        loginPassword: params.loginPassword || ""
      });

      if (result.error) {
        reply.status(400).send({ ok: false, error: result.error });
      } else {
        LOGGER.info(`CreateSession id:${result.value.user.id} ip:${request.socket.remoteAddress} port:${request.socket.remotePort}`);
        reply.status(200).send({ ok: true, token: result.value.token });
      }
    });
  }

  /**
   * Get reuqest parameter.
   * @param request Request.
   * @return Reuqest parameter.
   */
  private getParams(request: FastifyRequest): Record<string, string | undefined> {
    if (request.body && typeof request.body === "object") {
      return request.body as Record<string, string | undefined>;
    } else {
      return {};
    }
  }
}
