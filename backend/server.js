import express, { json } from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
