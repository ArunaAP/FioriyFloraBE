import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import bodyParser from 'body-parser';

dotenv.config();
connectDB();

import customerRoutes from'./routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import flowerRoutes from'./routes/flowerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/customers', customerRoutes); // Routes for managing customers
app.use('/api/orders', orderRoutes);       // Routes for managing orders
app.use('/api/flowers', flowerRoutes);     // Routes for managing flowers


// Home route for basic API info
app.get('/', (req, res) => {
    res.send('Welcome to the Flower Business Management API');
  });
  
  // Error handling middleware (optional)
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));