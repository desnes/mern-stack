const Stock = require('../models/Stock');
const mongoose = require('mongoose');   

// obtener todos los stocks
const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().sort({symbol: -1});
        res.status(200).json({stocks});
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
}   

// obtener un solo stock
const getStock = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }

    const stock = await Stock.findById(id);

    if (!stock) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }
    res.status(200).json({stock});
    
}

// crear un stock
const createStock = async (req, res) => {
    const {symbol, name, purchaseDate, pricePerShare, quantity, purchasePrice} = req.body;

    // guardar en la base de datos
    try {
        const stock = await Stock.create({
            symbol,
            name,
            purchaseDate,
            pricePerShare,
            quantity,
            purchasePrice
        });
        res.status(200).json({stock});
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
}

// actualizar un stock
const updateStock = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }

    const stock = await Stock.findByIdAndUpdate({_id: id}, {
        ...req.body
    });


    if (!stock) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }

    res.status(200).json(updatedStockResponse);
}

// borrar un stock
const deleteStock = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }

    const stock = await Stock.findOneAndDelete({_id: id});

    if (!stock) {
        return res.status(404).json({error: 'Registro no encontrado '});
    }

    res.status(200).json(stock);
}


module.exports = {
    createStock,
    getStock,
    getStocks,
    updateStock,
    deleteStock
}