import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
<<<<<<< HEAD
  password: process.env.DB_PASSWORD || "", 
=======
  password: process.env.DB_PASSWORD || "",
>>>>>>> 1b1b2888b8974ca80999dd878707d2cb0b871a33
  database: "crud_tienda",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });