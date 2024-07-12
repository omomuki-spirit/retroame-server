import { execSync } from "child_process";

console.info("[BUILD] Compile app");
execSync("prisma generate");
execSync("tsc -p /app");
