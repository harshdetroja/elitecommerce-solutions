import mongoose from "mongoose";

const connectDB = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGO_URI!);
  return handler(req, res);
};

export default connectDB;
