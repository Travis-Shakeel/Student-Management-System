const mongoose = require("mongoose");

    
const sectionSchema = new mongoose.Schema({
    _id:{
        type: Object
    },
    year: {
        type: Number,
        required:true
    },
    semester: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required:true
    },
    students_id: [{
        type: Object,
        ref: 'Student',
        default: []
    }],
    location : {
        type: String,
        required : true
    },
    course_id: {
        type: Number,
        ref: 'Course',
        required: true,
        unique: true,
        dropDups:true
    },
    start_time: {
        type: Number,
        required: true
    },
    end_time: {
        type: Number,
        required: true
    }
},
    {collection: 'section'}
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;