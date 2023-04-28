const mongoose = require('mongoose');
const addlist = mongoose.model('Registation');
const db = require('../config/db');
var userlibrary = require("../library/mongolibrary/userlibrary");
const { request, response } = require('../server');

module.exports.insertStudent = async (request, response) => {
    const student = new addlist({
        studentName: request.body.studentName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
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

module.exports.updatestudentStudent = async (request, response) => {
    const student = new addlist({
        _id: request.body.id,
        studentName: request.body.studentName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        country: request.body.country,
        state: request.body.state,
        address: request.body.address,
        pincode: request.body.pincode,
        courseType: request.body.courseType,
        created_at: request.body.created_at
    });
    await userlibrary.updatecollection(addlist, { _id: request.body.id }, student).then(result => {
        response.status(200).json({
            statusCode: 200,
            success: true,
            message: "Update Registation successfully",
            data: result,
        });
    }).catch(err => {
        console.log('error', err)
        response.status(200).json({
            statusCode: 500,
            success: failed,
            message: "Registation failed",
            data: err,
        });
    })
}

module.exports.getStudentData = async (request, response) => {
    const limit = request.body.limit;
    const current_index = request.body.current_page;
    let skip = current_index * (limit - 1);
    console.log('limit value', request.body);
    const count = await addlist.find().count();
    console.log('count value', count);
    await userlibrary.commonselectquery(addlist, skip, limit).then(result => {
        console.log('result', result.length)
        const total = result.length
        response.status(200).json({
            status: 200,
            data: result,
            message: "Data",
            total: total,
            count:count
        })
    }).catch(err => {
        console.log('error value list', err);
        response.status(200).json({
            statusCode: 500,
            success: false,
            message: "Data not Fetched",
            data: null,
        });
    })


}

module.exports.deleteStudentData = async (request, response) => {
    console.log('server resdasdasdsad')
    const id = request.params.id;
    console.log('server id value', id)
    userlibrary.deleteone(addlist, { _id: id }).then(result => {
        response.status(200).json({
            status: 200,
            statusCode: 200,
            data: result
        })
    }).catch(err => {
        console.log('error value list', err);
        response.status(200).json({
            statusCode: 500,
            success: false,
            message: "Data not Fetched",
            data: null,
        });
    })
}
