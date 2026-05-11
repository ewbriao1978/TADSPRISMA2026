const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const adapter = new PrismaMariaDb({
  host: 'localhost', // your database host
  user: 'root', // your database username
  password: '', // your database password
  database: 'TADSCARS', // optional, yo
});
const  prisma  = new PrismaClient({adapter});

module.exports = { prisma };