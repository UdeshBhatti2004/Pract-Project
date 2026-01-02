import { connect } from "mongoose";
import mongoose from "mongoose";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo url is not found");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    console.log("Database connected succesfully");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(MONGO_URI).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected succesfully");
  } catch (error) {
    throw error;
  }

  return cached.conn;
};

export default connectDb;
