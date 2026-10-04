// this file sets up the connection between your Node backend and MySQL.
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // wait for a connection to become available rather than throwing an error
  connectionLimit: 10, // set maximum number of open database connections to 10
  queueLimit: 0, // no limit to the number of requests in the queue
});

export default pool;