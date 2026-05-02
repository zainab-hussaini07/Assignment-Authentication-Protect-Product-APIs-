require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productroutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./Middleware/errorMiddleware');
const app = express();

app.use(express.json());
connectDB();
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start the server using PORT variable.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});