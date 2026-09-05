import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: String,
        required: true
    },
    resetToken: {
                type: String
},

    resetTokenExpires: {
    type: Date
},
    resetOtp: {
    type: String
},

resetOtpExpires: {
    type: Date
}
    
});

const User = mongoose.model('User', userSchema);

export default User;