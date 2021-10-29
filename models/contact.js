const mongoose = require('mongoose');
 
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    }
});
//Contact is going to be the collection name in the database 
//contactSchema is going to be the collection schema 
const Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;