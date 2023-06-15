import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs'
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

import PostsRoutes from './src/routes/postsRoutes.js';
import SchedulingRoutes from './src/routes/schedulingRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';

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

//EJS CONFIG
app.set('view engine', 'ejs')


// ROUTES
app.use('/schedules', SchedulingRoutes);
app.use('/posts', PostsRoutes);
app.use('/', usersRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('servidor ON');
});
