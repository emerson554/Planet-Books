const express = require("express")
const router = express.Router();
const productosModel = require("../models/libros");



/**
 * @swagger
 * components: 
 *  schemas:
 *      Libros:
 *          type: object
 *          properties:
 *              genero:
 *                  type: string
 *                  description: Genero del Libro
 *              nombre:
 *                  type: string
 *                  description: Nombre del Libro
 *              precio:
 *                  type: integer
 *                  description: Precio total del Libro
 *              stock:
 *                  type: integer
 *                  description: Cantidad disponible de Libros
 *              idioma:
 *                  type: string
 *                  description: Idioma disponible del Libro
 *              formato:
 *                  type: string
 *                  description: Formato disponible del Libro
 *              autor:
 *                  type: string
 *                  description: Autor del Libro
 *          required:
 *              - genero 
 *              - nombre
 *              - precio
 *              - stock
 *              - idioma
 *              - formato
 *              - autor
 *          example:
 *              genero: Tragedia 
 *              nombre: Romeo&Julieta
 *              precio: 15
 *              stock: 60
 *              idioma: español e ingles
 *              formato: A4
 *              autor: WilliamShakespeare
 *      
 */

/**
 * @swagger
 * /api/libros:
 *  post:
 *      sumary: Guarda productos 
 *      tags: [Libros]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Libros'
 *      responses:
 *          200:
 *              description: Libro agregado correctamente
 */


//Guardar libros 
router.post("/libros", async (req, res) => {   
    const libro = productosModel(req.body);

    libro.save()
        .then((data) => res.json ({mensaje : "Es libro esta guardado"}))
        .catch((error) =>  res.json ({mensaje: error})); 
});


/**
 * @swagger
 * /api/libros:
 *  get:
 *      sumary: Lista productos
 *      tags: [Libros]
 *      responses:
 *          200:
 *              description : Informacion Enlistada
 *              content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                  items:
 *                      $ref: '#components/schemas/Libros'
 * 
 * 
 */
//Enlistar libros 
router.get("/libros", async (req, res) => {
    productosModel.find()
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**Enlistar libros por nombre */

/**
 * @swagger
 * /api/libros/{nombre}:
 *  get:
 *      sumary: Lista de productos por nombre
 *      tags: [Libros]
 *      parameters:
 *          - in: path
 *            name: nombre
 *            schema:
 *              type: string
 *            required: true
 *            description: Libro a la vista
 *      responses:
 *          200:
 *              description: El libro te puede ver
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Libros'
 *          404:
 *              description: No existe el libro buscado
 */


//Enlistar libros por nombre
router.get("/libros/:nombre", async (req, res) => {
    const {nombre} = req.params;
    productosModel.find({$set: {nombre}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});

/**
 * @swagger
 * /api/libros/{genero}:
 *  get:
 *      sumary: Lista de productos por nombre
 *      tags: [Libros]
 *      parameters:
 *          - in: path
 *            name: genero
 *            schema:
 *              type: string
 *            required: true
 *            description: Escribe mi genero
 *      responses:
 *          200:
 *              description: El libro te puede ver
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Libros'
 *          404:
 *              description: No existe el libro buscado
 */

//Listar libros por genero
router.get("/libros/:genero", async (req, res) => {
    const {genero} = req.body;
    productosModel.find({$set: {genero}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/libros/{nombre}:
 *  delete:
 *      sumary: Elimina libros por nombre
 *      tags: [Libros]
 *      parameters:
 *          - in: path
 *            name: nombre
 *            schema:
 *              type: string
 *            required: true
 *            description: nombre del producto
 *      responses:
 *          200:
 *              description: El libro fue comido por un gusanito
 *          404:
 *              description: No existe el libro buscado
 */



//Eliminar libros por nombre
router.delete("/libros/:nombre", async (req, res) => {
    const {nombre} = req.params;
    productosModel.deleteOne({$set:{nombre}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/libros/{nombre}:
 *  put:
 *      sumary: Actualiza los libros por nombre
 *      tags: [Libros]
 *      parameters:
 *          - in: path
 *            name: nombre
 *            schema:
 *              type: string
 *            required: true
 *            description: nombre del producto
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Libros'
 *      responses:
 *          200:
 *              description: Una nueva version del libro se creo
 *          404:
 *              description: No existe el libro que quieres actualizar
 */


//Actualizar libros por nombre
router.put("/libros/:nombre", async (req, res) => {
    const {nombre} = req.params;
    const {genero, precio, stock, idioma, formato, autor} = req.body;
    productosModel.updateOne({$set: {genero, nombre, precio, stock, idioma, formato, autor}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});
module.exports = router;