require ('dotenv').config()
const express = require('express')
const stocksRoutes = require('./routes/stocks')
const mongoose = require('mongoose')
const cors = require('cors')

// Crear el servidor de express
const app = express();

// Habilitar CORS
app.use(cors());

// Habilitar express.json
app.use(express.json());

//MIddleware
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})


// Rutas
app.use('/api/stocks', stocksRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

//listen for request
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});
