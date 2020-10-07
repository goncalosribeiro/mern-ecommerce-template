const express = require('express');
const connectDB = require('./server/database/db');
const cookieParser = require('cookie-parser')
require('dotenv').config();

//app
const app = express();

//import routes
const authRoutes = require('./server/routes/auth')

//connect to db
connectDB()

//Initiate Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
// app.use(cors())


//routes
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
})
