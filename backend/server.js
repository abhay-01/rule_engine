import { json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import ruleRoutes from './routes/ruleRoutes.js';

const app = express();
connectDB();

app.use(cors());
app.use(json());
app.use('/api', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
