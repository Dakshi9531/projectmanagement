import express from 'express';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const app = express();

app.use(express.json());


// PUBLIC ROUTES
app.use('/users', userRoutes);


// PROTECTED ROUTES
//app.use(authenticate);

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
    res.send('Project Management API is running!');
});

export default app;