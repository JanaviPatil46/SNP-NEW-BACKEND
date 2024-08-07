const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/userRoutes');
const dbconnect = require('./database/dbConnect');
const app = express();
require('dotenv').config();
app.use(express.json());


app.use(cors());

app.use('/api/auth/users', authRoutes);

// database connect
dbconnect()

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`connection is live at port no. ${PORT}`);
})