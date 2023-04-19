const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

mongoose.model('User', userschema, 'users');