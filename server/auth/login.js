const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(401);
        return res.status(400).json({message: 'Email and password are required'});
    }
    try {
        const user = await UserModel.findOne({email});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        address: user.address,
                        phoneNumber: user.phoneNumber,

                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
            );
            return res.status(200).json({accessToken: accessToken, user: user});
        } else {
            return res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Server error', error: err.message});
    }
};
const currentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message: 'Server error', error: err.message});
    }
};
module.exports = {login, currentUser};