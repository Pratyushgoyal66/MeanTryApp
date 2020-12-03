const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database, { useNewUrlParser: true,  useUnifiedTopology: true } );

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to databse' + config.database);
});
//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error:' + err);
});

const app = express();

const users = require('./routes/users');

//Index Route
app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD!</h1>');
});

//Set-up Cross-Origin Resource Sharing
app.use(cors());

//Parsers
app.use(express.json()); //Parse json bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

//Port Number
const PORT = process.env.PORT || 5000;

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Start Server
app.listen(PORT, () => {
    console.log('Server started on PORT' + PORT)
});
