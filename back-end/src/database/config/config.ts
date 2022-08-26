import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME || 'db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'passowrd',
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  }
);