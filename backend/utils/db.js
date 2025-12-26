// utils/db.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI env var');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    console.log('→ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,             // ← No buffering → no "timed out after 10000ms"
      serverSelectionTimeoutMS: 5000,    // Fail fast if can't select server
      socketTimeoutMS: 20000,
      connectTimeoutMS: 10000,
      // family: 4,                      // Uncomment if IPv6 causes delays
      // maxPoolSize: 10,                // Tune if you hit Atlas connection limits
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

module.exports = connectDb;





// const mongoose = require("mongoose");

// // const URI = "mongodb://127.0.0.1:27017/mern_admin";
// // mongoose.connect(URI);

// const URI = process.env.MONGODB_URI;

// const connectDb = async () => {
//   try {
//     await mongoose.connect(URI);
//     console.log("connection successful to database");
    
//   }
//   catch {
//     console.error("database connection failed");
//     process.exit(0);
//   }
// };

// module.exports = connectDb;

