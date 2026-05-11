const { PrismaClient } = require('@prisma/client');
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
        // select * from cars
        return res.status(200).json(cars);
    },

    async getCarById(req, res) {
        const { id } = req.params;
        console.log(`Fetching car with ID ${id} from the database...`);
        const car = await prisma.cars.findUnique({
            where: { id: parseInt(id) },
        });
        //select * from cars where id = parseInt(id)
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        return res.status(200).json(car);
    },

    async createCar(req, res) {
        const { modelo, marca, preco } = req.body;
        console.log('Creating a new car with data:', req.body);
        if (!modelo || !marca || !preco) {
            return res.status(400).json({ error: 'Modelo, marca, and preco are required' });
        }
        const newCar = await prisma.cars.create({
            data: {
                modelo,
                marca,
                preco: parseFloat(preco),
            },
        });
        // insert into cars (modelo, marca, preco) values (modelo, marca, parseFloat(preco))
        return res.status(201).json(newCar);
    },

    async deleteCar(req, res) {
        const { id } = req.params;
        console.log(`Deleting car with ID ${id} from the database...`);
        const deletedCar = await prisma.cars.delete({
            where: { id: parseInt(id) },
        });
        // delete from cars where id = parseInt(id)
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        return res.status(200).json({ message: 'Car deleted successfully' });
    },
    async updateCar(req, res) {
        const { id } = req.params;
        const { modelo, marca, preco } = req.body;
        console.log(`Updating car with ID ${id} with data:`, req.body);
        const updatedCar = await prisma.cars.update({
            where: { id: parseInt(id) },
            data: {
                modelo,
                marca,
                preco: parseFloat(preco),
            },
        });
        // update cars set modelo = modelo, marca = marca, preco = parseFloat(preco) where id = parseInt(id)
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        return res.status(200).json(updatedCar);
    }


}