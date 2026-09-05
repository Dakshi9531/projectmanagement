import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import crypto from 'crypto';
import * as emailService from './emailService.js';


// =====================================================
// CREATE USER
// =====================================================

export async function createUser(userData) {

    const user = await User.create(userData);

    return user;
}


// =====================================================
// GET ALL USERS
// =====================================================

export async function getAllUsers() {

    const users = await User.find();

    return users;
}


// =====================================================
// GET USER BY ID
// =====================================================

export async function getUserById(id) {

    const user = await User.findById(id);

    return user;
}


// =====================================================
// UPDATE USER
// =====================================================

export async function updateUser(id, userData) {

    const user = await User.findByIdAndUpdate(
        id,
        userData,
        {
            new: true,
            runValidators: true
        }
    );

    return user;
}


// =====================================================
// DELETE USER
// =====================================================

export async function deleteUser(id) {

    const user = await User.findByIdAndDelete(id);

    return user;
}


// =====================================================
// SIGN UP
// =====================================================

export async function signUp(userData) {

    const {
        userId,
        name,
        email,
        password,
        role,
        experience
    } = userData;


    // Check whether email already exists

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('User already exists');
    }


    // Hash password

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    // Create user

    const user = await User.create({

        userId,
        name,
        email,
        password: hashedPassword,
        role,
        experience

    });


    return user;
}


// =====================================================
// SIGN IN
// =====================================================

export async function signIn(email, password) {


    // Find user using email

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }


    // Compare entered password
    // with hashed password in MongoDB

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );


    if (!isMatch) {
        throw new Error('Invalid email or password');
    }


    // Create JWT token

    const token = jwt.sign(

        {
            userId: user._id
        },

        process.env.SECRET_KEY,

        {
            expiresIn: '24h'
        }

    );


    return {
        user,
        token
    };
}


// =====================================================
// FORGOT PASSWORD - RESET TOKEN
// =====================================================

export async function forgotPassword(email) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }


    // Generate reset token

    const resetToken =
        crypto.randomBytes(32).toString('hex');


    // Token valid for 10 minutes

    const resetTokenExpires =
        new Date(Date.now() + 10 * 60 * 1000);


    user.resetToken = resetToken;

    user.resetTokenExpires = resetTokenExpires;


    await user.save();


    // Send token through email

    await emailService.sendResetEmail(
        email,
        resetToken
    );


    return {
        message: 'Reset token sent to your email'
    };
}


// =====================================================
// RESET PASSWORD - RESET TOKEN
// =====================================================

export async function resetPassword(
    email,
    token,
    newPassword
) {

    const user = await User.findOne({
        email,
        resetToken: token
    });


    if (!user) {
        throw new Error('Invalid reset link');
    }


    if (
        !user.resetTokenExpires ||
        user.resetTokenExpires < new Date()
    ) {
        throw new Error('Reset link has expired');
    }


    // Hash new password

    const hashedPassword =
        await bcrypt.hash(newPassword, 10);


    user.password = hashedPassword;


    // Remove used token

    user.resetToken = undefined;

    user.resetTokenExpires = undefined;


    await user.save();


    return {
        message: 'Password reset successfully'
    };
}


// =====================================================
// FORGOT PASSWORD - OTP
// =====================================================

export async function forgotPasswordOtp(email) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }


    // Generate 6 digit OTP

    const otp =
        crypto.randomInt(100000, 1000000).toString();


    // OTP valid for 10 minutes

    const otpExpires =
        new Date(Date.now() + 10 * 60 * 1000);


    // Save OTP in database

    user.resetOtp = otp;

    user.resetOtpExpires = otpExpires;


    await user.save();


    console.log('Generated OTP:', otp);
    console.log('Saved OTP:', user.resetOtp);


    // Send OTP through email

    await emailService.sendOtpEmail(
        email,
        otp
    );


    return {
        message: 'OTP sent to your email'
    };
}


// =====================================================
// RESET PASSWORD - OTP
// =====================================================

export async function resetPasswordOtp(
    email,
    otp,
    newPassword
) {


    // Find user using email only

    const user = await User.findOne({
        email
    });


    if (!user) {
        throw new Error('User not found');
    }


    // Check OTP

    console.log('OTP received:', otp);
    console.log('OTP stored in database:', user.resetOtp);


    if (user.resetOtp !== otp) {

        throw new Error('Invalid OTP');

    }


    // Check OTP expiration

    if (
        !user.resetOtpExpires ||
        user.resetOtpExpires < new Date()
    ) {

        throw new Error('OTP has expired');

    }


    // Hash new password

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );


    user.password = hashedPassword;


    // Remove OTP after successful password reset

    user.resetOtp = undefined;

    user.resetOtpExpires = undefined;


    await user.save();


    return {
        message: 'Password reset successfully'
    };
}