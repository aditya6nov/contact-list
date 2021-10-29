//require the library
// const mongoose = require('mongoose');
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection (to check whether the connection is succesfull)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to database'));

//up and running then print the message
db.once('open',function(){
    console.log("succesfully connected to the database");
})