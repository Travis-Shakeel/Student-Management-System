const express = require("express");
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require('./routes/adminRoutes');

mongoose.connect("mongodb://127.0.0.1:27017/Student_Management_System", {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, function() {
    console.log("Server started at port 5000");
});