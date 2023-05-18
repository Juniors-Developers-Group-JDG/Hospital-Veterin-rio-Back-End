import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import routes from './src/routes/schedulingRoutes.js';

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
app.use('/', routes);

app.listen(3000, () => {
  console.log('servidor ON');
});
