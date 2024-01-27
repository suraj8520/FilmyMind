import mongoose from 'mongoose';

export default async function connectDB(mongo_uri) {
  try {
    await mongoose.connect(mongo_uri);
    console.log('Connected to database!');
  } catch (error) {
    console.log('Connection to database failed!', error);
  }
}
