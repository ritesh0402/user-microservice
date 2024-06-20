import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI!)
   .then(() => console.log('User Service: MongoDB connected'))
   .catch(err => console.error(err));

export default app;
