import {PrismaClient} from "@prisma/client";
import {logger} from "./logging.js";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";

// Create MariaDB adapter for MySQL connection
// Note: MariaDB adapter works with MySQL since MariaDB is a fork of MySQL
// In Prisma 7, we pass the adapter factory directly to PrismaClient
const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "",
  database: "belajar_nodejs_restful_api",
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