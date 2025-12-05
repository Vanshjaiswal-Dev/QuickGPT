import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for successful connection
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected");
    });

    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}`)
  } catch (error) {
    console.log("❌ MongoDB Error:", error.message);
  }
};

export default connectDB;
