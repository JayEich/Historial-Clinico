import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';


dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {res.send('API Historial Clínico funcionando 🚀');});

app.use('/auth', authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Base de datos conectada');

    const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);//DEBUG
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar la base de datos', error);//DEBUG
  });
