const mongoose = require('mongoose');

let connectionInstance = null;

const connectDB = async () => {
  if (connectionInstance) {
    return connectionInstance;
  }

  try {
    connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log('MongoDB connection error: ', error);
    process.exit(1);
  }

  return connectionInstance;
};

module.exports = connectDB;
