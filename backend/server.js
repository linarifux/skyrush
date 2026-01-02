import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js'; // Ensure you add the .js extension!
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB(); // You need to export this function from config/db.js

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('SkyRush API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);

// Error Handling Middleware (Must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));