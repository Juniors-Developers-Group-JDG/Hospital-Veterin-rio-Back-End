import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import PostsRoutes from './src/routes/postsRoutes.js';
import SchedulingRoutes from './src/routes/schedulingRoutes.js';

dotenv.config();
const app = express();
// MONGODB CONFIG
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://bkdVet:bkdVet2023@clustervet.lcn4fm8.mongodb.net/').then(() => {
  console.log('conectado ao banco');
});

// BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use('/agendamento', SchedulingRoutes);
app.use('/posts', PostsRoutes);

app.listen(3000, () => {
  console.log('servidor ON');
});
