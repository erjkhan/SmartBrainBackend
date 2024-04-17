 const express = require('express');
 const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register') ;
const signIn = require('./controllers/signIn') ;
const profile = require('./controllers/profile') ;
const image = require('./controllers/image'); 

const db= knex({
        client: 'pg',
        connection: {
          host :  '127.0.0.1', //localhost
          user : 'postgres', //add your user name for the database here
          password : 'test', //add your correct password in here
          database : 'smart-brain' //add your database name you created here
        }
});
	


 const app = express();

 app.use(bodyParser.json());
 app.use(cors());
 app.get('/',(req,res)=>
	{ res.send('success')}
	);

app.post('/signin', (req,res)=>{signIn.handleSignIn(req,res ,db,bcrypt)})

app.post('/register', (req,res)=>{ register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{ profile.handleProfileGet(req,res,db)})


app.put('/image', (req,res)=>{ image.handleImage(req,res,db)})
app.post('/imageUrl', (req,res)=>{ image.handleApiCall(req,res)})






 app.listen(3000,()=>{console.log("running on port 3000")});