import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  forcePathStyle: true, 
});

export async function listS3Buckets(): Promise<void> {
  const result = await s3.send(new ListBucketsCommand({}));
  console.log(result.Buckets);
}