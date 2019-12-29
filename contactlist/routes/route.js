const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

//retrieveing data
router.get('/contact',(req,res,next)=> {
    console.log('Retrieving the contact list');
    //find functioon to retrieve contacts
    Contact.find(function(err, contactsss) {
        res.json(contactsss);
    })
});

//add contact
router.post('/contact',(req,res,next)=> {
    //res.send('Retrieving the contact list');
    //logic to add contact
    let newContact  = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    });

    newContact.save((err, contact)=> {
        if(err){
            res.json({msg : "Failed to add contact"});
        }
        else{
            res.json({msg : "Contact added Successfully"});
        }
            
    });

});

//delete contact
router.delete('/contact/:id',(req,res,next)=> {
    //res.send('Retrieving the contact list');
    //logic to add contact
    Contact.remove({_id : req.params.id}, function(err, result) {
        if(err) {
            res.json(err);
        }
        else {
            console.log("Contact Deleted Successfully");
            res.json(result);
        }
    })
});

module.exports = router;