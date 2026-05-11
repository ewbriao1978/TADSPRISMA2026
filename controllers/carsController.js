const { PrismaClient } = require('@prisma/client');
//const { PrismaClient } = require('../generated/prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const adapter = new PrismaMariaDb({
  host: 'localhost', // your database host
  user: 'root', // your database username
  password: '', // your database password
  database: 'TADSCARS', // optional, yo
});
const  prisma  = new PrismaClient({adapter});

module.exports = {

    async getAllCars(req, res) {
        console.log('Fetching all cars from the database...');
        console.log('Using database connection string:', process.env.DATABASE_URL); 
        if (!prisma) {
            console.error('Prisma client is not initialized. Check your database connection settings.');
            return res.status(500).json({ error: 'Database connection error' });
        }
        const cars = await prisma.cars.findMany();
        res.json(cars);
    },


}