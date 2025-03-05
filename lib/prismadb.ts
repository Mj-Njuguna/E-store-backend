import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient({
  log: ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
})

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;
