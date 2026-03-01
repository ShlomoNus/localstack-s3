// scripts/localstack-logs.ts
import { spawn } from "node:child_process";

// Usage:
//   npm run ls:logs
//   npm run ls:logs -- 500
const tail = process.argv[2] ?? "200";

const p = spawn(
  "docker",
  ["compose", "logs", "-f", "--tail", String(tail), "localstack"],
  { stdio: "inherit", shell: true },
);

p.on("exit", (code) => process.exit(code ?? 0));