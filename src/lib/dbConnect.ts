
import mongoose, { type Mongoose } from 'mongoose';

// console.log('[dbConnect] Script start. process.env.NODE_ENV:', process.env.NODE_ENV);
// console.log('[dbConnect] Attempting to read MONGODB_URI directly:', process.env.MONGODB_URI ? "Exists" : "Does NOT exist", "(Type:", typeof process.env.MONGODB_URI, ")");

const MONGODB_URI = process.env.MONGODB_URI;

// console.log('[dbConnect] MONGODB_URI after assignment:', MONGODB_URI ? "Exists" : "Does NOT exist", "(Type:", typeof MONGODB_URI, ")");


if (!MONGODB_URI) {
  console.error('[dbConnect] MONGODB_URI is not defined in environment variables.');
  console.error('[dbConnect] Value of process.env.MONGODB_URI:', process.env.MONGODB_URI);
  console.error('[dbConnect] Type of process.env.MONGODB_URI:', typeof process.env.MONGODB_URI);
  console.error('[dbConnect] Please ensure that:');
  console.error('[dbConnect] 1. You have a .env.local file in the root of your project.');
  console.error('[dbConnect] 2. The .env.local file contains a line like: MONGODB_URI=your_connection_string');
  console.error('[dbConnect] 3. You have restarted your Next.js development server after creating/modifying .env.local.');
  throw new Error(
    'MONGODB_URI not found. Please ensure this variable is defined in a .env.local file at the root of your project (e.g., MONGODB_URI=your_connection_string_here) and that you have restarted your development server.'
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache;

if (process.env.NODE_ENV === 'development') {
  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }
  cached = global.mongooseCache;
} else {
  cached = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
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
      console.log('[dbConnect] Database connected successfully.');
      return mongooseInstance;
    }).catch(err => {
      console.error('[dbConnect] Database connection error:', err);
      cached.promise = null; // Reset promise on error
      throw err;
    });
  }

  try {
    console.log('[dbConnect] Awaiting database connection promise.');
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on error
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;
