import { WebSocketServer } from "ws";
import { ApplicationServer } from "./application_server";

/**
 * LobbyServer (WebSocket Server)
 */
export class WorldServer extends ApplicationServer {
  readonly server: WebSocketServer;

  /**
   * Initialize server.
   * @param host host address
   * @param port port number
   */
  constructor(host: string, port: number) {
    super(host, port);
    this.server = new WebSocketServer({ host: this.host, port: this.port });
  }

  /**
   * Start server.
   */
  start(): void {
    LOGGER.info(`Listen ws://${this.host}:${this.port}`);

    this.server.on("connection", (ws, req) => {
      console.log(`${req.socket.remoteAddress}, ${req.socket.remotePort}`);

      ws.on("close", () => { console.log("close");});
      ws.on("error", () => { console.log("error");});
      ws.on("message", () => { console.log("message");});
      ws.on("ping", () => { console.log("ping");});
      ws.on("pong", () => { console.log("pong");});
      ws.on("unexpected-response", () => { console.log("unexpected-response");});
      ws.on("upgrade", () => { console.log("upgrade"); });
    });
  }
}
