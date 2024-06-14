const express = require('express');
const Stock = require('../models/Stock');
const { 
    createStock,
    getStock,
    getStocks,
    updateStock,
    deleteStock
} = require('../controllers/stockController');
const router = express.Router();
 
// obtener todos los stocks
router.get('/', getStocks);

// obtener un solo stock
router.get('/:id', getStock);

// crear un stock
router.post('/', createStock);

// actualizar un stock
router.patch('/:id', updateStock);

// borrar un stock
router.delete('/:id', deleteStock);

module.exports = router;