/**
 * Application server base class.
 */
export abstract class ApplicationServer {
  readonly host: string;
  readonly port: number;

  /**
   * Initialize server.
   * @param host host address
   * @param port port number
   */
  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  /**
   * Start server.
   */
  abstract start(): void;
}
