console.log("Server is running");

// environmental imports 
require('dotenv').config();

// dependencies imports 
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// custom imports 
const corsOptions = require('./config/corsOptions'); // provides allowedOrigins for connections 
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials'); //add access credentials when accessing from allowedOrigins 
const connectDB = require('./config/dbConn'); //mongoose db connection 
const PORT = process.env.PORT || 3500;

// establish connection to mongoDB 
connectDB();

// necessary application settings 
app.use(logger); // custom logging middleware 
app.use(credentials); // handle options credentials check and fetch cookies credentials requirement
app.use(cors(corsOptions)); // cross origin resource sharing 
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded form data 
app.use(express.json()); // built-in json middleware 
app.use(cookieParser()); // built in cookies middleware 

// routes declaration 
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// api database access 
app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/journals', require('./routes/api/journals'));
app.use('/journalsEntry', require('./routes/api/journalsEntry'));

// error handling
app.use(errorHandler);

// establish connection + check 
mongoose.connection.once('open', () => {
    console.log('Connected to fxjournalDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});