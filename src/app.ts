import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/your_database_name'; // Replace with your MongoDB URI

app.use(bodyParser.json()); // Important for parsing JSON request bodies
app.use('/users', userRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});
