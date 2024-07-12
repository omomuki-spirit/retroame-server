import pino from "pino";
import { LobbyServer } from "./servers/lobby_server";

global.LOGGER = pino();

(new LobbyServer("0.0.0.0", 3001)).start();
