import mongoose from "mongoose";

const connectMongoDB = async () => {

console.log("okokok",process.env.MONGODB_URI);

    
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export default connectMongoDB;
