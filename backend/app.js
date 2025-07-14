const express = require('express');
const db = require('./config/connection');
const userrouter = require('./router/userrouter');
const adminrouter = require('./router/adminrouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(cookieParser());

// Routes
app.use('/user', userrouter);
app.use('/admin', adminrouter);
// Server
app.listen(`${process.env.PORT}`, () => {
    console.log('Server is running on port 3000');
});
