const express = require('express');
const connectDB = require('./server/database/db');
require('dotenv').config();

//import routes
const userRoutes = require('./server/routes/user')

//connect to db
connectDB()

//app
const app = express();

//routes
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
})
