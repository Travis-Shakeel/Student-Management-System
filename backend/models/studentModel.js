const mongoose = require("mongoose");

    
const studentSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        dropDups:true
    },
    phone_Number: {
        type: String
    },
    address: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    department_id: {
        type: String,
        default: "1121"
    },
    sections: [{
        type: Object,
        ref:'Section',
        default: []
    }],
    currentFee: {
        type: Number,
        default: 0
    },
    loan: [{
        year: {
        type: Number,
        default: 0
        },
        start_Date: {
            type: String,
            default: " "
        },
        end_Date: {
            type: String,
            default: " "
        }
    }],
    fees: [{
            tution_Fee: {
                type: String,
                default: " "
            },
            date_of_Receipt: {
                type: Date,
                default: new Date()
        } 
    }],
    Grades: [{
        _id:false,
        letter_grade: {
            type: String,
            default: null
        },
        course_id: {
            type: Number,
            ref: 'Course',
            unique: true,
            dropDups: true
        }
    }]
},
    {collection: 'student'}
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;