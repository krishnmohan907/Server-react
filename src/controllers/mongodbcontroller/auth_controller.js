const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UploadImage = mongoose.model("UploadFile");
var userlibrary = require("../../library/mongolibrary/userlibrary");
var config = require("../../config/config.js");
const multer = require("multer");
const { request, response } = require("../../server");

// User signup API
module.exports.signup = async (request, response) => {
    console.log("the request is the", request.body);
    var user = new User({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        created_at: new Date(),
        updated_at: new Date(),
    });
    await userlibrary.emailverification(User, { email: `${request.body.email}` }).then(async result => {
        result.forEach(element => {
            if (element.email == request.body.email) {
                return response.status(200).json({
                    statusCode: 200,
                    success: true,
                    message: 'email is alredy exist',
                    data: null
                })
            } else {
                userlibrary
                    .insertCollection(user)
                    .then((resp) => {
                        response.status(200).json({
                            statusCode: 200,
                            success: true,
                            message: "signup successfully",
                            data: resp,
                        });
                    })
                    .catch((err) => {
                        console.log("the error is theeeee", err);
                        response.status(200).json({
                            statusCode: 500,
                            success: failed,
                            message: "signup failed",
                            data: null,
                        });
                    });
            }
        });
    })
};

// User login API
module.exports.login = async (request, response, next) => {
    console.log("the login id is theeeeeeee", request.body);
    var whereObj = {
        username: request.body.username,
        password: request.body.password,
    };
    console.log("the login id is theeeeeeee", whereObj);
    await userlibrary
        .simpleselectlogin(User, whereObj)
        .then(async (resp) => {
            if (resp == null) {
                return response.status(200).json({
                    statusCode: 404,
                    success: false,
                    message: "Invalid username or password",
                    data: null,
                });
            } else {
                await userlibrary
                    .updatecollection(
                        User,
                        { username: request.body.username },
                        { lastLoginTime: new Date(), status: "Active" }
                    )
                    .then((result) => {
                        console.log("Last login time updated", result);
                    });
                var token = jwt.sign(
                    {
                        username: resp.username,
                        email: resp.email,
                    },
                    config.database.securitykey,
                    {
                        expiresIn: "24h",
                    }
                );
                response.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Login successful",
                    data: resp,
                    token: token,
                    lastlogintime: resp.lastLoginTime,
                });
            }
        })
        .catch((err) => {
            console.log("error", err);
            response.status(200).json({
                statusCode: 500,
                success: false,
                message: "Error while login",
                data: null,
            });
        });
};

// Logout
module.exports.userLogout = (req, res, next) => {
    console.log(req.body);

    userlibrary
        .updatecollection(
            User,
            { username: req.body.username },
            { status: "Inactive" }
        )
        .then((result) => {
            console.log("Last login time updated", result);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "User logout successful",
            });
        })
        .catch((err) => {
            console.log("Error while logout user", err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: "Error while logout user",
            });
        });
};

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage,
}).single("testImage");


module.exports.filepath = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("error", err);
        } else {
            const newImage = UploadImage({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: "image/png",
                },
            });
            newImage
                .save()
                .then(() => res.send("sucess file"))
                .catch((err) => {
                    console.log("eeror", err);
                });
        }
    });
};


module.exports.getuserData = async (request, response) => {
    userlibrary.commonselectquery(User).then(result => {
        response.status(200).json({
            status: 200,
            statusCode: 200,
            message: 'Data Fetched',
            data: result,
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

