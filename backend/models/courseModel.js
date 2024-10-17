const mongoose = require("mongoose");

    
const courseSchema = new mongoose.Schema({
    _id:{
        type: Object
    },
    course_Name: {
        type: String,
        required:true
    },
    course_Description: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required:true
    },
    department_id:{
        type: Number,
        required: true
    }
},
    {collection: 'course'}
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;