import * as userService from '../services/userService.js';
import mongoose from 'mongoose';


// ==================== SIGN UP ====================

export async function signup(req, res) {

    try {

        const user = await userService.signUp(req.body);

        res.status(201).json({
            message: 'User registered successfully',
            user: user
        });

    } catch (err) {

        if (
            err.name === 'ValidationError' ||
            err.code === 11000
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// ==================== SIGN IN ====================

export async function signin(req, res) {

    try {

        const { email, password } = req.body;

        const result = await userService.signIn(
            email,
            password
        );

        res.status(200).json({
            message: 'Login successful',
            user: result.user,
            token: result.token
        });

    } catch (err) {

        res.status(401).json({
            message: err.message
        });
    }
}


// ==================== CREATE USER ====================

export async function createUser(req, res) {

    try {

        const user = await userService.createUser(req.body);

        res.status(201).json(user);

    } catch (err) {

        if (
            err.name === 'ValidationError' ||
            err.code === 11000
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// ==================== GET ALL USERS ====================

export async function getAllUsers(req, res) {

    try {

        const users = await userService.getAllUsers();

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// ==================== GET USER BY ID ====================

export async function getUserById(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const user = await userService.getUserById(
            req.params.id
        );

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// ==================== UPDATE USER ====================

export async function updateUser(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const user = await userService.updateUser(
            req.params.id,
            req.body
        );

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// ==================== DELETE USER ====================

export async function deleteUser(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const user = await userService.deleteUser(
            req.params.id
        );

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User deleted',
            user: user
        });

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// =====================================================
// FORGOT PASSWORD - RESET TOKEN
// =====================================================

export async function forgotPassword(req, res) {

    try {

        const result = await userService.forgotPassword(
            req.body.email
        );

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
}


// =====================================================
// RESET PASSWORD - RESET TOKEN
// =====================================================

export async function resetPassword(req, res) {

    try {

        const result = await userService.resetPassword(
            req.body.email,
            req.body.token,
            req.body.newPassword
        );

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
}


// =====================================================
// FORGOT PASSWORD - OTP
// =====================================================

export async function forgotPasswordOtp(req, res) {

    try {

        const result = await userService.forgotPasswordOtp(
            req.body.email
        );

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
}


// =====================================================
// RESET PASSWORD - OTP
// =====================================================

export async function resetPasswordOtp(req, res) {

    try {

        const result = await userService.resetPasswordOtp(
            req.body.email,
            req.body.otp,
            req.body.newPassword
        );

        res.status(200).json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
}