const mongoose = require("mongoose")

const productoModel = mongoose.Schema({
    genero: {
        type: String,
        required: true
    },
    nombre: { 
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    idioma: {
        type: String,
        required: true
    },
    formato: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Libros", productoModel)