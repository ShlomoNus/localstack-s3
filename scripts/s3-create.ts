// scripts/s3-create.ts
import { spawnSync } from "node:child_process";

const bucket = process.argv[2];

if (!bucket) {
  console.error("Usage: npm run s3:create -- <bucket-name>");
  process.exit(1);
}

const endpoint = "http://localstack:4566";

const res = spawnSync(
  "docker",
  ["compose", "exec", "-T", "awscli", "aws", `--endpoint-url=${endpoint}`, "s3", "mb", `s3://${bucket}`],
  { stdio: "inherit", shell: true },
);

process.exit(res.status ?? 0);