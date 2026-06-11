import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD || "", 
  database: "crud_tienda",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });