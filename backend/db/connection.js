import { connect } from "mongoose";
import config from "../config/config.js";

async function connectDB() {
  try {
    const connection = await connect(config.mongodb_uri, {
      dbName: "taxi-booking",
    });
    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
