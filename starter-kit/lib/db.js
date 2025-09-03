import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env file"
  );
}

const MONGO_URI = process.env.MONGO_URI;
const options = {
  appName: "Next-starter-kit",
};

export const client = new MongoClient(MONGO_URI, options);
export const db = client.db(process.env.MONGO_DB || "starter-kit-example");

async function connectToDb() {
  try {
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectToDb;
