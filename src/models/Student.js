const mongoose = require('mongoose');

const addStudent = mongoose.Schema({
    stu_id: {
        type: Number
    },
    studentName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    country: {
        type: String,
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    courseType: {
        type: String
    },
    created_at: {
        type: Date
    }
});

mongoose.model('Registation', addStudent, 'addlist')