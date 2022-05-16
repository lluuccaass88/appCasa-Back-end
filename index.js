require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const dbConnect = require("./database/index")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
  res.send('This is my TCC!')
})

dbConnect .connectDatabase();

app.listen(port, () => {
  console.log(`Server run in port: ${port}`)
})

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

//Express - roteamento: https://expressjs.com/pt-br/guide/routing.html
//