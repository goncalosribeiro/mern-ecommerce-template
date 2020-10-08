const express = require('express');
const connectDB = require('./server/database/db');
const cookieParser = require('cookie-parser')
require('dotenv').config();

//app
const app = express();

//import routes
const authRoutes = require('./server/routes/auth')
const userRoutes = require('./server/routes/user')
const categoryRoutes = require('./server/routes/category')
const productRoutes = require('./server/routes/product')

//connect to db
connectDB()

//Initiate Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
// app.use(cors())


//routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
})
