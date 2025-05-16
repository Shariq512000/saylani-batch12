// const Pool = require('pg').Pool
import { Pool } from "pg";
import 'dotenv/config';

export const db = new Pool({
  user: process.env.DB_USERS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})