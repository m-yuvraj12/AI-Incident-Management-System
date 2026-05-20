import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: "postgres",
  host: "localhost",
  database: "incident_db",
  password: "Yuvraj@123",
  port: 5432,
});

export default pool;
