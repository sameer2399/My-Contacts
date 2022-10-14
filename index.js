const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static("assets"));

var contactList = [
  {
    name: "Sameer",
    phone: "1111111111",
  },
  {
    name: "Tony Stark",
    phone: "1234567890",
  },
  {
    name: "Coding Ninjas",
    phone: "2356478198",
  },
];

app.get("/", function (req, res) {

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in finding contacts from DB");
            return;
        }
        return res.render("home", {
            title: "Contact List",
            contact_list: contacts,
          });
    });
  
});



app.get("/practice", function (req, res) {
  return res.render("practice", 
            { title: "Let us play with ejs" });
});



app.post("/create-contact", function (req, res) {
 
      Contact.create({
          name: req.body.name,
          phone: req.body.phone
    }, function(err, newContact){
          if(err){
              console.log('Error in creating a contact');
              return;
          }
          console.log('*******', newContact);
    });
      return res.redirect('back');
});


app.get("/delete-contact", function (req, res) {
  
   let id = req.query.id;
   Contact.findByIdAndDelete(id, function(err){
    if(err){
        console.log("Error in deleting from database");
        return;
    }
        return res.redirect('back');
   });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }

  console.log("Yup! express server is up and running on port", port);
});

