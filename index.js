const express = require('express');
const mongoose = require('mongoose');
const cookieSession =require('cookie-session');

const keys =require('./config/keys');
const bodyParser = require('body-parser');
const cors = require("cors");


require('./models/User');



const app = express();
require('./routes/authRoutes')(app);

var corsOptions = {
    origin: "http://localhost:5000"
  };
  
  app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000,
        keys:[keys.cookieKey]
    })
);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true },err => {
 
    if(err){
        console.log('Database connection error');
        console.log(err);
    }
    console.log('connected to database');
  });



const PORT = process.env.PORT || 5000;
app.listen(PORT);
