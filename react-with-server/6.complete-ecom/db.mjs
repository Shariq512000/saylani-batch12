
import 'dotenv/config'
import { Pool } from 'pg';

export const db = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
    ssl:{
        rejectUnauthorized: false
    }
});