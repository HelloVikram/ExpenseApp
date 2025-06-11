const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return token;
    } catch (err) {
        throw new Error('Login problem');
    }

};

const signup = async (name, email, password) => {
    const saltrounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltrounds);

    try {
        const newUser = await User.create({
            username: name,
            email: email,
            password: hashedPassword,
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.email) {
            throw new Error('Email already exists');
        }
        console.log(error);
    }
};

module.exports = { login, signup };
