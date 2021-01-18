const express = require('express')
const bodyparser = require('body-parser')
const app = express()


var cookieParser = require("cookie-parser");
var session = require("express-session");

require('dotenv').config()

const router = express.Router()

const cors        = require('cors');
const fetch = require('node-fetch');

app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 360000,
    },
  })
);
// 1000*60*6
// guide -  1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)

app.use((req, res, next) => {

  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


app.get('/', function (req, res) {
  res.send("welcome")
});


app
  .route("/login")
  .post(async (req, res) => {
                              //  console.log("DW",req.body);
             const {username ,password} = req.body
           
             // fields not complete
            if (!username || !password) {
                return res.status(401).json({ error: 'Please enter all fields' });
            }

    try{

          const url = "https://api.bybits.co.uk/auth/token";

         

           const bodyData = {
                username: username,
            password: password,
              type: "USER_PASSWORD_AUTH"
              }

            
          const resData = await fetch(url,{
                  method: "POST",
                  body: JSON.stringify(bodyData),
                  headers: {'Content-Type': 'application/json',
                        'environment': 'mock'}
          })

          if(resData.status >=200 && resData.status <=299){

          const data = await resData.json()
            // console.log("data",data);

               if(!data){
                  alert("Issue with login in, please try again")                  
                  req.session.user = ""
                  return  res.status(500).json({error: "Internal error please try again"} );
                     
                            
                } 
            
            // Bcypt - dont know salt number, unable to use this package
            // check if pw & username correct. Not required - I have made up usernames & pw and the API excepts anything.

             
             req.session.user = data.access_token;
               
             return res.status(200).json(data.access_token)
      
 

          }
            
            //
          
        

    }
    catch(err){
          console.log("DW ERR", err);
        res.status(500).json({ error: err.message });
        

    }
            
     
  
  });   //end of post


  app
  .route("/dashboard")
  .get(async (req, res) => {
             
    
          
    try{

          const url = "https://api.bybits.co.uk/policys/details";

          // const authID = "Bearer MuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0zX3JkdldSMGs";
          const authID = `Bearer ${req.session.user}`;
          // console.log(authID);
            
          const resData = await fetch(url,{
                  method: "GET",
                  Authorization: authID,
                  headers: {'Content-Type': 'application/json',
                        'environment': 'mock'}
          })

          const data = await resData.json()

             //  console.log(data);
            const {policy_ref,cover} = data.policy
            const {make,model,colour,reg} = data.vehicle
            const {line_1,line_2, postcode} = data.policy.address
            // console.log(policy_ref,cover)
            // console.log(make,model,colour,reg)
            // console.log(line_1,line_2,postcode)
            const address = `${line_1}, ${line_2}, ${postcode} `;
            const car = `${make} ${model} ${colour}-${reg} `;

            let newObj = {
                         policy_ref,
                        address,
                        cover,
                        "car": car.charAt(0).toUpperCase()+car.slice(1),
                }

            res.status(200).json(newObj)
                      

    }
    catch(err){
          console.log("DW ERR", err);
        res.json({ msg: err.message });

    }
            
     
  
  });   //end of get

  app.get("/logout", (req, res) => {
  // console.log("logout",req.session);
  // console.log("logout",req.session.user);
  if (req.session.user && req.cookies.user_sid) {
    // req.session.user =""
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

  //no path
app.use(function(req, res, next) {
  res.status(404).send('No page found');
});



const PORT = 8080
app.listen(PORT,function(){
  console.log("express on");
})


process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
 
  });
});