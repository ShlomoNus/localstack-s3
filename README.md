# S3 + LocalStack

Local S3 development using [LocalStack](https://localstack.cloud/) and the AWS SDK. Use this repo to run S3 locally, create buckets, and test upload/download via scripts or the app.

## Prerequisites

- **Node.js** (for scripts and app)
- **Docker** and **Docker Compose** (for LocalStack)

## Quick start

1. **Install dependencies**

   ```
   npm install
   ```

2. **Start LocalStack** (S3 on port 4566)

   ```
   npm run docker:up
   ```

   Leave this running. In another terminal:

3. **Create a bucket and run the app**

   ```
   npm run s3:create-base   # create bucket "base"
   npm run start            # list buckets via AWS SDK
   ```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run docker:up` | Start LocalStack + AWS CLI containers (`docker compose up`) |
| `npm run s3:create -- <name>` | Create an S3 bucket (e.g. `npm run s3:create -- my-bucket`) |
| `npm run s3:create-base` | Create bucket named `base` |
| `npm run s3:list` | List S3 buckets (via AWS CLI in container) |
| `npm run s3:test -- <bucket>` | Upload, list, and download a test object in the bucket |
| `npm run ls:logs` | Tail LocalStack logs (default 200 lines) |
| `npm run ls:logs-500` | Tail LocalStack logs (500 lines) |
| `npm run start` | Run the app (lists buckets using AWS SDK) |

## Configuration

- **LocalStack**: S3 only, port **4566**, region `us-east-1`, persistence enabled.
- **App/SDK**: Connects to `http://localhost:4566` with test credentials (`test` / `test`).

Scripts that use the AWS CLI run inside the `awscli` container and talk to LocalStack at `http://localstack:4566`.

## License

ISC
