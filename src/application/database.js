import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import {PrismaMariaDb} from "@prisma/adapter-mariadb";
import "dotenv/config";

// Parse DATABASE_URL to extract connection parameters
// Format: mysql://user:password@host:port/database
const parseDatabaseUrl = (url) => {
  const match = url.match(/mysql:\/\/([^:]+):?([^@]*)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    throw new Error("Invalid DATABASE_URL format");
  }
  return {
    user: match[1],
    password: match[2] || "",
    host: match[3],
    port: parseInt(match[4]),
    database: match[5],
  };
};

const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL);

// Create MariaDB adapter for MySQL connection
// Note: MariaDB adapter works with MySQL since MariaDB is a fork of MySQL
// In Prisma 7, we pass the adapter factory directly to PrismaClient
const adapter = new PrismaMariaDb({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

export const prismaClient = new PrismaClient({
    adapter: adapter,
    log: [
        // {level: 'query', emit: 'stdout'},
        {level: 'error', emit: 'stdout'},
        {level: 'info', emit: 'stdout'},
        {level: 'warn', emit: 'stdout'},
    ]
});