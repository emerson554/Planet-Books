const mongoose = require("mongoose")

const oredenesModel = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    nombreLibro: { 
        type: String,
        required: true
    },
    direccion: {
        type: Boolean,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("ordenes", oredenesModel)