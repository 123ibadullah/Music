import mongoose from "mongoose";

// Cache the connection for serverless
let cachedConnection = null;

const connectDB = async () => {
  // If already connected, return the cached connection
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("✅ Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined!");
    }

    console.log("🔄 Connecting to MongoDB...");
    console.log("🔗 URI:", process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    // Mongoose connection options for serverless
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Maintain connection pool
      minPoolSize: 1,
    });
    
    console.log("✅ MongoDB connected successfully");
    console.log("📋 Registered models:", Object.keys(mongoose.models));
    
    // Cache the connection
    cachedConnection = connection;
    return connection;

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("❌ Error code:", error.code);
    cachedConnection = null;
    throw error; // Re-throw so controllers can handle it
  }
};

// Event handlers
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  cachedConnection = null;
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
  cachedConnection = null;
});

mongoose.connection.on("connected", () => {
  console.log("🔗 MongoDB connected event fired");
});

export default connectDB;