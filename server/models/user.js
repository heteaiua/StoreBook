const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user']},
    favoriteBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
