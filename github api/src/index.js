//Llamada de paquetes
const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const libros = require("./routes/producto");
const empleados = require("./routes/empleado");
const ordenes = require("./routes/orden");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

//Inicializar variables 
const app = express();
const port = 8000;
app.use(express.json());
const swaggerSpecs = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Documentación de api Planet Books",
            version: "1.0.0"
        },
        servers:[
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: [
        ` ${path.join(__dirname,"./routes/*.js")} `
    ]
}
//Rutas
app.use("/api", libros);
app.use("/api", empleados);
app.use("/api", ordenes);

//Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpecs))); 
app.get("/prueba", (req, res) => {
    res.send("Bienvendos al API rest de PlanetBooks")
});



//Configurar el servidor
mongoose.connect(process.env.mongoose_url)
    .then(() => { console.log ("Conexion exitosa")})
    .catch((error) => { console.log (error) })
    
app.listen(port, () => console.log ("Aplicacion funciona en el puerto ", port))


