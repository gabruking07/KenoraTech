import { MongoClient } from "mongodb";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {};

export async function getMongoDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  const mongoClientPromise =
    globalThis.__mongoClientPromise ?? new MongoClient(uri, options).connect();

  if (process.env.NODE_ENV !== "production") {
    globalThis.__mongoClientPromise = mongoClientPromise;
  }

  const client = await mongoClientPromise;
  return client.db(process.env.MONGODB_DB || "kenora-tech");
}
