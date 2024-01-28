import dotenv from 'dotenv';
import app from './app.js'; // I should be able to use without extension
import connectDB from './database/connection.js';
// but for some reason i'm not
dotenv.config();

const port = process.env.PORT || 6900;
const mongo_uri = process.env.MONGODB_CONNECTION_URI;

const startServer = async () => {
  try {
    await connectDB(mongo_uri);
    app.listen(port, () => {
      console.log('App is listening to port ' + port);
    });
  } catch (error) {
    console.log('Failed to connect to Database', error);
  }
};

startServer();
