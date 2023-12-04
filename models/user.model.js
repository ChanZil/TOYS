const { Schema, model } = require("mongoose");

const userScheme = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },
});

const User = model("User", userScheme);
module.exports.User = User;