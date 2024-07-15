import { execSync } from "child_process";

console.info("[BUILD] Compile app");
execSync("prisma generate", { stdio: "inherit" });
execSync("tsc -p /app", { stdio: "inherit" });
