import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';
import clinicalHistoryRoutes from './routes/clinical-history.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API Historial Clínico funcionando...');//debugeo
});

app.use('/auth', authRoutes);
app.use('/histories', clinicalHistoryRoutes);

// Por si no esta en modo test
if (process.env.NODE_ENV !== 'test') {
  AppDataSource.initialize()
    .then(() => {
      console.log('--> Base de datos conectada');
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`--> Servidor escuchando en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error al conectar la base de datos', error);
    });
}

export default app;
