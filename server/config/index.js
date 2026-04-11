require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST || process.env.PGDATABASE_TEST
    : process.env.POSTGRES_DB || process.env.PGDATABASE;

const connectionString =
  process.env.DATABASE_URL ||
  process.env.DATABASE_PUBLIC_URL ||
  `postgresql://${encodeURIComponent(
    process.env.POSTGRES_USER || process.env.PGUSER
  )}:${encodeURIComponent(
    process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD
  )}@${process.env.POSTGRES_HOST || process.env.PGHOST}:${
    process.env.POSTGRES_PORT || process.env.PGPORT || 5432
  }/${database}`;

const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};