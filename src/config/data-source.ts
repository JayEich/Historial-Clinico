import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
//import { ClinicalHistory } from "../entities/clinical-history.entity";
import dotenv from "dotenv";
import { parse } from "path";

dotenv.config();

// Configuración de la conexión a la base de datos
//  pa decirle al ORM "Oes mira esta es la BD que vas a usar" 
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Esto no se usa pa produccion
    logging: false,
    entities: [User],
    //entities: [User, ClinicalHistory],
    migrations: [],
    subscribers: [],
})