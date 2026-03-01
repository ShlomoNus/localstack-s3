// scripts/s3-test-bucket.ts
import { spawnSync } from "node:child_process";

const bucket = process.argv[2];

if (!bucket) {
  console.error("Usage: npm run s3:test -- <bucket-name>");
  process.exit(1);
}

const endpoint = "http://localstack:4566";
const key = `healthcheck-${Date.now()}.txt`;
const payload = `test-${Date.now()}`;

function run(args: string[]) {
  const res = spawnSync("docker", args, { stdio: "inherit", shell: true });
  if ((res.status ?? 0) !== 0) process.exit(res.status ?? 1);
}

run([
  "compose",
  "exec",
  "-T",
  "awscli",
  "sh",
  "-lc",
  // pipe content into S3 object
  `echo "${payload}" | aws --endpoint-url=${endpoint} s3 cp - s3://${bucket}/${key}`,
]);

run([
  "compose",
  "exec",
  "-T",
  "awscli",
  "aws",
  `--endpoint-url=${endpoint}`,
  "s3",
  "ls",
  `s3://${bucket}/`,
]);

run([
  "compose",
  "exec",
  "-T",
  "awscli",
  "aws",
  `--endpoint-url=${endpoint}`,
  "s3",
  "cp",
  `s3://${bucket}/${key}`,
  "-",
]);

console.log(`\nOK: uploaded & downloaded s3://${bucket}/${key}\n`);