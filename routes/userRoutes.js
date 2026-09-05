import express from 'express';

import * as userController from '../controllers/userController.js';

import {
    signup,
    signin,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    forgotPasswordOtp,
    resetPasswordOtp
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/', createUser);

router.get('/', getAllUsers);

router.post('/forgot-password', userController.forgotPassword);

router.post('/reset-password', userController.resetPassword);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);
router.post(
    '/forgot-password-otp',
    userController.forgotPasswordOtp
);

router.post(
    '/reset-password-otp',
    userController.resetPasswordOtp
);

export default router;