// scripts/s3-list.ts
import { spawnSync } from "node:child_process";

const endpoint = "http://localstack:4566";

const res = spawnSync(
  "docker",
  ["compose", "exec", "-T", "awscli", "aws", `--endpoint-url=${endpoint}`, "s3", "ls"],
  { stdio: "inherit", shell: true },
);

process.exit(res.status ?? 0);