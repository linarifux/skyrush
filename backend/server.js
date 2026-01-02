import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js'; // Ensure you add the .js extension!
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import shipStationRoutes from './routes/shipStationRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB(); // You need to export this function from config/db.js

const app = express();

// Update allowed origins
const allowedOrigins = [
  'http://localhost:5173', 
  'https://skyrush-two.vercel.app' // <--- Your actual frontend
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Crucial if you are using cookies
}));

// Routes
app.get('/', (req, res) => {
  res.send('SkyRush API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/shipstation', shipStationRoutes);

// Error Handling Middleware (Must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));