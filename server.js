import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

import app from './main.js';



const PORT = 5000;

async function start() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {

            console.log('Server started');

            console.log(
                `Open http://localhost:${PORT}`
            );
        });

    } catch (err) {

        console.error(
            'Could not connect to MongoDB'
        );

        console.error(err.message);

        process.exit(1);
    }
}

start();