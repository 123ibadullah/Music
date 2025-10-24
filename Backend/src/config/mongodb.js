import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined!");
    }

    console.log("🔄 Connecting to MongoDB...");
    console.log("🔗 URI:", process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    // Remove deprecated options for newer Mongoose versions
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("✅ MongoDB connected successfully");
    
    // Log registered models for debugging
    mongoose.connection.on("connected", () => {
      console.log("📋 Registered models:", Object.keys(mongoose.models));
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("❌ Full error:", error);
    // Don't exit in serverless - just log the error
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });
};

export default connectDB;