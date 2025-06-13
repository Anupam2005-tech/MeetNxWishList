
import 'dotenv/config'; // Explicitly load .env variables
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI not found. Please ensure this variable is defined in a .env.local file at the root of your project (e.g., MONGODB_URI=your_connection_string_here) and that you have restarted your development server.'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Creating new database connection promise');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully');
      return mongooseInstance;
    }).catch(err => {
      console.error('Initial MongoDB connection error:', err);
      cached.promise = null; // Reset promise on error
      throw err;
    });
  }

  try {
    console.log('Awaiting database connection promise');
    cached.conn = await cached.promise;
  } catch (e) {
    // cached.promise should have been nulled by the catch block in the promise chain
    // but defensive nulling here is okay.
    cached.promise = null; 
    console.error('Failed to establish MongoDB connection:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
