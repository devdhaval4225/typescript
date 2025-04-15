import express from 'express';
import './db/connection';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${PORT}`, // Update with your frontend URL
    credentials: true,
  })
);

app.use(bodyParser.json()); // Important for parsing JSON request bodies
app.use('/v1/users/', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});