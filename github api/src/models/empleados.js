const mongoose = require("mongoose")

const empleadosModel = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: { 
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("empleados", empleadosModel)