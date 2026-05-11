const express = require('express');
const carsRoutes = require('./routes/carsRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(carsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
