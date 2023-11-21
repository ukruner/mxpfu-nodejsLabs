const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
    
];


router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4));
});

function getDateFromString(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}
  
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
  let sorted_users=users.sort(function(a, b) {
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
          return d1-d2;
        });
        res.send(JSON.stringify({sorted_users},null,4));
});
  // for (user = 0 ; i < users.length; i++) {
  //   Object.fromEntries(
  //     Object.entries(user).map(([key, value]) => {
  //       if (key === "DOB" ){
  //       return [key, new Date(value)];
  //       }else {
  //         return [key, value];
  //       }}));
// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let email = req.params.email;
  let singleEmail = users.filter(user => (user.email == email));
  res.send(singleEmail);//This line is to be replaced with actual return value
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName, "lastName":req.query.lastName, "email": req.query.email, "DOB": req.query.DOB})
  res.send("User" + (' ') + (req.query.firstName) + " has been added");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  let targetUser = users.find(user => (user.email == email));
  console.log(targetUser);
  let newDOB = req.query.DOB;
  if (targetUser) {
  targetUser.DOB = newDOB;
  res.send((targetUser.firstName)+"'s date of birth has been updated to "+(targetUser.DOB));//This line is to be replaced with actual return value
  }
  else  {
  res.send("Unable to find user!");
  };
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  initialUserCount = users.length;
  users = users.filter(user => (user.email != email));
  if (users.length < initialUserCount) {
  res.send(`user with email ${email} deleted`)}
  else{
    res.status(404).send("brrrruv, user with such e-mail not found");
  }
});

module.exports=router;
