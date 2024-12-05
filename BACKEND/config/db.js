import mongoose from "mongoose";
const DB_URI = 'mongodb://localhost:27017/food-delivery';

// Connect to MongoDB
export const connectDB = async ()=>{

await mongoose.connect(DB_URI, {
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

}