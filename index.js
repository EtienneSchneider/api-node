const express = require("express")
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();
// Connect to db
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},
(err)=> {
    if(!err) console.log("Mongodb connecté")
    else console.log("Connection error : " +err);
}
);

//Middleware 
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);

app.listen("3000", ()=> console.log("Server écoutant sur le port 3000"));