const express = require("express")
const router = express.Router();
const oredenesModel = require("../models/ordenes");



/**
 * @swagger
 * components: 
 *  schemas:
 *      Ordenes:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre completo del cliente
 *              nombreLibro:
 *                  type: string
 *                  description: Nombre del Libro
 *              direccion:
 *                  type: integer
 *                  description: Direccion del cliente
 *              celular:
 *                  type: integer
 *                  description: Numero de celular del cliente
 *              cantidad:
 *                  type: string
 *                  description: Cantidad del pedido
 *              fecha:
 *                  type: string
 *                  description: Fecha de la entrega 
 *          required:
 *              - nombre
 *              - nombreLibro
 *              - direccion
 *              - celular
 *              - cantidad
 *              - fecha
 *          example:
 *              nombre: Romeo Ugarte Lopez
 *              nombreLibro: romeoyjulieta
 *              direccion: Av. Tomas Marsano
 *              celular: 970870375
 *              cantidad: 1
 *              fecha: 12/06/2023
 * 
 *      
 */

/**
 * @swagger
 * /api/ordenes:
 *  post:
 *      sumary: Guarda ordenes 
 *      tags: [Ordenes]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Ordenes'
 *      responses:
 *          200:
 *              description: Orden agregado correctamente
 */


//Guardar ordenes 
router.post("/ordenes", async (req, res) => {   
    const ordenes = oredenesModel(req.body);

    ordenes.save()
        .then((data) => res.json ({mensaje : "Esta ordenes fue guardada"}))
        .catch((error) =>  res.json ({mensaje: error})); 
});


/**
 * @swagger
 * /api/ordenes:
 *  get:
 *      sumary: Lista ordenes
 *      tags: [Ordenes]
 *      responses:
 *          200:
 *              description : Ordenes Enlistada
 *              content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                  items:
 *                      $ref: '#components/schemas/Ordenes'
 * 
 * 
 */
//Enlistar ordenes 
router.get("/ordenes", async (req, res) => {
    oredenesModel.find()
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**Enlistar ordenes por nombre del cliente */

/**
 * @swagger
 * /api/ordenes/{nombre del cliente}:
 *  get:
 *      sumary: Lista de ordenes por nombre del cliente
 *      tags: [Ordenes]
 *      parameters:
 *          - in: path
 *            name: nombre del cliente
 *            schema:
 *              type: string
 *            required: true
 *            description: Orden visible
 *      responses:
 *          200:
 *              description: La orden esta visible
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Ordenes'
 *          404:
 *              description: La orden no existe
 */


//Enlistar ordenes por nombre
router.get("/ordenes/:nombre", async (req, res) => {
    const {nombre} = req.params;
    oredenesModel.find({$set: {nombre}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});

/**
 * @swagger
 * /api/ordenes/{nombre de Libro}:
 *  get:
 *      sumary: Lista de ordenes por nombre del libro
 *      tags: [Ordenes]
 *      parameters:
 *          - in: path
 *            name: nombre de libro
 *            schema:
 *              type: string
 *            required: true
 *            description: Escribe el nombre del libro
 *      responses:
 *          200:
 *              description: la orden esta visible
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Ordenes'
 *          404:
 *              description: La orden no existe
 */

//Listar ordenes por nombre de libro
router.get("/ordenes/:nombreLibro", async (req, res) => {
    const {nombreLibro} = req.body;
    oredenesModel.find({$set: {nombreLibro}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/ordenes/{nombre del cliente}:
 *  delete:
 *      sumary: Elimina ordenes por nombre del cliente
 *      tags: [Ordenes]
 *      parameters:
 *          - in: path
 *            name: nombre del cliente
 *            schema:
 *              type: string
 *            required: true
 *            description: nombre del cliente
 *      responses:
 *          200:
 *              description: la orden fue eliminada
 *          404:
 *              description: No existe la orden buscada
 */



//Eliminar libros por nombre
router.delete("/ordenes/:nombre", async (req, res) => {
    const {nombre} = req.params;
    oredenesModel.deleteOne({$set:{nombre}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/ordenes/{nombre del cliente}:
 *  put:
 *      sumary: Actualiza las ordenes por nombre del cliente
 *      tags: [Ordenes]
 *      parameters:
 *          - in: path
 *            name: nombre del cliente
 *            schema:
 *              type: string
 *            required: true
 *            description: nombre de la orden
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Ordenes'
 *      responses:
 *          200:
 *              description: Una nueva version de la orden se creo
 *          404:
 *              description: No existe la orden que quieres actualizar
 */


//Actualizar libros por nombre
router.put("/ordenes/:nombre", async (req, res) => {
    const {nombre} = req.params;
    const {nombreLibro, direccion, celular, cantidad, fecha} = req.body;
    oredenesModel.updateOne({$set: {nombreLibro, nombre, direccion, celular, cantidad, fecha}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});
module.exports = router;