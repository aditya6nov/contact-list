const express = require('express');
const path = require('path');
const port = 5000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('assets'));




//fetching the cotacts
app.get('/', function (req, res) {

    Contact.find({}, function (err, Contacts) {
        if (err) {
            console.log('error in fetching the contacts');
            return;
        }

        return res.render('home', {
            title: "contact list",
            contact_list: Contacts
        });
    });
});

//creating the contacts fron the wire
app.post('/create-contact', function (req, res) {

    Contact.create({
        name: req.body.name,
        phoneNo: req.body.phoneNo
    }, function (err, newContact) {
        if (err) {
            console.log('there is an error while creating thr contact');
            return;
        }

        // console.log('**********', newContact);
        return res.redirect('back');
    });
});

//updating the contacts
app.route("/update-contact/")
    .get((req, res) => {
        const id = req.query.id;
        Contact.find({}, function (err, Contacts) {
            if(err){
                console.log("error while finding the contacts in update-contact route");
                return;
            }
            res.render("contactEdit.ejs", {
                title: "contact list",
                todoTasks: Contacts,
                idTask: id
            });
        });
    })
    .post((req, res) => {
        const id = req.query.id;
        Contact.findByIdAndUpdate(id, {
            name: req.body.name,
            phoneNo: req.body.phoneNo
        }, function(err){
            if (err){ return res.send(500, err);}
            return res.redirect('/'); 
        });
});

//delting the contacts
app.get('/delete-contact/', function (req, res) {
    //get the id of the element to be deleted
    let id = req.query.id;

    // find the contact in the database using the id
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error while deleting the contact');
            return;
        }

        return res.redirect('back');
    })

});


app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("server is responding to the port: ", port);
})

//this was the function when we are not using the database
// app.get('/delete-contact/:phoneNo',function(req,res){
//     // console.log(req.params);
//     let phone=req.params.phoneNo;
//     let contactIndex= contactList.findIndex(contact=>contact.phoneNo == phone);
//     if(contactIndex != -1){
//         contactList.splice(contactIndex , 1);
//     }
//     return res.redirect('back');
// });

//creating the new contacts
// app.post('/create-contact',function(req,res){
// return res.redirect('/');
// contactList.push({
//     name:req.body.name,
//     phoneNo:req.body.phoneNo
// })

// app.get('/practice',function(req,res){
//     return res.render('practice',{title:'My practice playground'})
// })


// var contactList = [
//     {
//         name:"joey tribbiani",
//         phoneNo:"9988776655"
//     },{
//         name:"chandler bing",
//         phoneNo:"9933557744"
//     },{
//         name:"ross geller",
//         phoneNo:"8899774338"    
//     }
// ]