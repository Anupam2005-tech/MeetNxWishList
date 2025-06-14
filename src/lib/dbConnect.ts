
import mongoose from 'mongoose';

console.log('[dbConnect] Initializing database connection module.');
console.log(`[dbConnect] Attempting to read MONGODB_URI from process.env.`);
console.log(`[dbConnect] Value of process.env.MONGODB_URI: ${process.env.MONGODB_URI}`);
console.log(`[dbConnect] Type of process.env.MONGODB_URI: ${typeof process.env.MONGODB_URI}`);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('[dbConnect] Critical Error: MONGODB_URI is not defined or is an empty string.');
  console.error('[dbConnect] Please verify the following:');
  console.error('[dbConnect] 1. A .env.local file exists in the root of your project.');
  console.error('[dbConnect] 2. The .env.local file contains a line like: MONGODB_URI=your_connection_string');
  console.error('[dbConnect] 3. You have restarted your Next.js development server after creating/modifying .env.local.');
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
    console.log('[dbConnect] Using cached database connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('[dbConnect] Creating new database connection promise.');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('[dbConnect] MongoDB connected successfully via new promise.');
      return mongooseInstance;
    }).catch(err => {
      console.error('[dbConnect] Initial MongoDB connection error via new promise:', err);
      cached.promise = null; // Reset promise on error
      throw err;
    });
  }

  try {
    console.log('[dbConnect] Awaiting database connection promise.');
    cached.conn = await cached.promise;
    console.log('[dbConnect] Database connection promise resolved.');
  } catch (e) {
    cached.promise = null;
    console.error('[dbConnect] Failed to establish MongoDB connection while awaiting promise:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
