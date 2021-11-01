// NPM dependencies to install
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express ();

// library of controllers
const register = require('./ServerControllers/Register');
const signin = require('./ServerControllers/signin');
const id = require('./ServerControllers/id');
const image = require('./ServerControllers/image');

//database conection to front end
    //take in mind that CLARIFAI API takes too much updates times, 
    //it might fail to load the API since the API server goes down sometimes
const db = knex({ 
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});

//json reader
app.use(bodyParser.json());
app.use(cors())

//database for testing users
const database = {
    users: [
        {
            id: '123',
            name: 'Jhon',
            email: 'jhon@gmail.com',
            password: 'coockies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'apples',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> { res.send('it is working') })

//app sign in coding
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

//app register
app.post('/register', (req, res,) => {register.handleRegister(req, res, db, bcrypt)});

//app getting profile information coding
app.get('/profile/:id', (req, res) => {id.handleId(req, res, db)});

//app increment photos count coding
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
//server port report
app.listen( process.env.PORT || 3000, ()=> {
    console.log(`app is puuurrrrring at port ${process.env.PORT}`);
})