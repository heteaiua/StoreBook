const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');


const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 60 * 1000; //1 min
const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(401);
        return res.status(400).json({message: 'Email and password are required'});
    }
    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        if (user.isLocked()) {
            return res.status(423).json({message: "Account is locked.Try again later"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            user.loginAttempts += 1;

            if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
                user.lockUntil = Date.now() + LOCK_TIME;
            }
            await user.save();
            return res.status(400).json({message: "Invalid email or password."});
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.save();

        const accessToken = jwt.sign({
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '4h'}
        );
        return res.status(200).json({accessToken: accessToken, user: user});
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