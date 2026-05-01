// Import mongoose so we can connect Node.js with MongoDB.
const mongoose = require('mongoose');

// Function to connect to MongoDB.
const connectDB = async () => {
  try {
    // console.log("MONGO_URI:", process.env.MONGO_URI);
    // Connect to MongoDB using the MONGO_URI stored inside .env file.
    await mongoose.connect("mongodb+srv://zainab:Mongo123456@cluster0.cmovc9i.mongodb.net/?appName=Cluster0");

    // If connection is successful, show this message.
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    // If connection fails, show the error.
    console.log("Database connection failed:", error);

    // Stop the server if database does not connect.
    process.exit(1);
  }
};

// Export connectDB so app.js can import and run it.
module.exports = connectDB;