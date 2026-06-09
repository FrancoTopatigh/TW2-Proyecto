import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "./prisma/client.js";
import { config } from "./config/config.js";

const adapter = new PrismaPlanetScale({
  url: config.db
});
export const prisma = new PrismaClient({
  adapter
});