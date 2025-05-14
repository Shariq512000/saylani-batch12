// const Pool = require('pg').Pool
import { Pool } from "pg"
export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Shariq@10011@',
  port: 5432,
})