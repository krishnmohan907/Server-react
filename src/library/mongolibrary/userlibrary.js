require('dotenv').config();
const Promise = require('bluebird');
const CryptoJS = require('crypto-js');
const { response } = require('express');
const { result } = require('underscore');
// const { set } = require('mongoose');

let insertCollection = (tableName) => {
    return new Promise((resolve, reject) => {
        let query = tableName.save();
        query.then(result => {
            resolve(result);
        }).catch(error => {
            console.log('errorsdsdsds', error);
            reject(error);
        })
    })
}

let simpleselect = function (tableName, where) {
    return new Promise((resolve, reject) => {
        let query = tableName.find(where);
        query.findOne();
        query.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}
let commonselectquery =  function (tablename, skip, limit) {
    console.log('skip value', skip, limit);
    return new Promise((resolve, reject) => {
        let query = tablename.find().skip(skip).limit(limit);
        query.then(result => {
            resolve(result);
        }).catch(error => {
            console.log('error', error);
            reject(error);
        })
    })
}

let updatecollection = function (tablename, updateData, setData) {
    console.log('tablename', tablename, updateData, setData);
    return new Promise((resolve, reject) => {
        let query;
        if (updateData) {
            query = tablename.updateOne(updateData, { $set: setData });
            console.log(query)
        } else {
            query = tablename.updateMany(updateData, { $set: setData });
        }
        // console.log('the update query',query);
        query.then(result => {
            resolve(result);
        }).catch(error => {
            console.log('error', error)
            reject(error);
        })
    })
}

let emailverification = function (tablename, email) {
    return new Promise((resolve, reject) => {
        let query = tablename.find(email);
        query.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let simpleselectlogin = function (tablename, obj) {
    return new Promise((resolve, reject) => {
        let query = tablename.findOne(obj);
        query.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}
let deleteone = function (tablename, id) {
    return new Promise((resolve, reject) => {
        let query = tablename.deleteOne(id);
        query.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    insertCollection,
    simpleselect,
    commonselectquery,
    updatecollection,
    emailverification,
    simpleselectlogin,
    deleteone
}

