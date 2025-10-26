// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected',()=> console.log('Database connected'));
//         await mongoose.connect(`${process.env.MONGODB_URL}/Aura`)
//     } catch (error) {
//        console.log(error.message)
//     }

// }

// export default connectDB;

// server/configs/db.js

import mongoose from 'mongoose';

// 1. Declare a variable to hold the cached connection object
//    This variable is outside the function, so it persists across warm invocations.
const connection = {};

/**
 * Connects to MongoDB, reusing the cached connection if available.
 */
async function connectDB() {
  // Check 1: If we already have a connection, return it immediately.
  if (connection.isConnected) {
    console.log('✅ Using existing MongoDB connection.');
    return;
  }

  // Check 2: If we are already in the process of connecting, wait for it.
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) { // 1 means connected
        console.log('✅ Reusing existing Mongoose connection (readyState 1).');
        return;
    }
  }

  // Final step: Connect and cache the connection details.
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      // Optional: Set pool size to 1 to minimize connections from multiple serverless instances
      // maxPoolSize: 1, 
    });
    
    // Set the cached connection state
    connection.isConnected = db.connections[0].readyState;
    console.log('🎉 New MongoDB connection established.');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    // CRITICAL: Re-throw the error so Vercel can catch the crash and log it clearly.
    throw new Error('Database connection failed to initialize.');
  }
}

export default connectDB;