import nodemailer from 'nodemailer';

export async function sendResetEmail(email, resetToken) {

    const transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',

        port: 587,

        secure: false,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: 'Password Reset Token',

        html: `
            <h2>Password Reset</h2>

            <p>Your password reset token is:</p>

            <h3>${resetToken}</h3>

            <p>This token will expire in 10 minutes.</p>

            <p>Copy this token and use it in the Reset Password API.</p>
        `
    });
}
export async function sendOtpEmail(email, otp) {
    console.log("EMAIL_USER =", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',

        port: 587,

        secure: false,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: 'Password Reset OTP',

        html: `
            <h2>Password Reset OTP</h2>

            <p>Your OTP for password reset is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in 10 minutes.</p>

            <p>Do not share this OTP with anyone.</p>
        `
    });
}
