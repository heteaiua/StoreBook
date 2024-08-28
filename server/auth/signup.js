const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const userValidation = require('../validate-models/validateUserSchema');
const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        rePassword,
        age,
        address,
        phoneNumber,
        role
    } = req.body;

    const {error} = userValidation(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

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
            console.log(user.role, user.email, "rolll")
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
