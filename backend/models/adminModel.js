const mongoose = require("mongoose");

    
const sectionSchema = new mongoose.Schema({
    _id:{
        type: Object
    },
    name: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        rquired:true
    }
},
    {collection: 'admin'}
);

const Admin = mongoose.model('Admin', sectionSchema);

module.exports = Admin;