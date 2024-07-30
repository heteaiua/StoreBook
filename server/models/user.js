const mongoose = require("mongoose");

const User = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match:
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
});
module.exports = mongoose.model("User", User);