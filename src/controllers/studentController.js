const mongoose = require('mongoose');
const Student = mongoose.model('Registation');
const db = require('../config/db');
var userlibrary = require("../library/mongolibrary/userlibrary");

module.exports.insertStudent = async (request, response) => {
    const student = new Student({
        studentName: request.body.studentName,
        email: request.body.email,
        PhoneNumber: request.body.PhoneNumber,
        country: request.body.country,
        state: request.body.state,
        address: request.body.address,
        pincode: request.body.pincode,
        courseType: request.body.courseType,
        created_at: request.body.created_at
    });
    await userlibrary.insertCollection(student).then(result => {
        response.status(200).json({
            statusCode: 200,
            success: true,
            message: "Registation successfully",
            data: result,
        });
    }).catch(err => {
        response.status(200).json({
            statusCode: 500,
            success: failed,
            message: "Registation failed",
            data: err,
        });
    })
}