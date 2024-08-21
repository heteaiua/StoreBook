const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        age,
        address,
        phoneNumber,
        role
    } = req.body;

    try {
        const userAvailable = await UserModel.findOne({email});
        if (userAvailable) {
            return res.status(400).json({message: "User already registered!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            address,
            phoneNumber,
            role
        });

        if (user) {
            return res.status(201).json({
                email: user.email,
                role: user.role,
                message: `Thanks for joining us, ${user.firstName}!`,
            });
        } else {
            return res.status(400).json({message: "User creation failed!"});
        }
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports = signup;
