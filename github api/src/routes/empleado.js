const express = require("express")
const router = express.Router();
const empleadosModel = require("../models/empleados");



/**
 * @swagger
 * components: 
 *  schemas:
 *      Empleados:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del empleado
 *              apellido:
 *                  type: string
 *                  description: Apellido del empleado
 *              dni:
 *                  type: integer
 *                  description: DNI del empleado
 *              edad:
 *                  type: integer
 *                  description: Edad del empleado
 *              nacionalidad:
 *                  type: string
 *                  description: Nacionalidad del empleado
 *          required:
 *              - nombre
 *              - apellido
 *              - dni
 *              - edad
 *              - nacionalidad
 *          example:
 *              nombre: Oscar Branny 
 *              apellido: Fuentes
 *              dni: 60452278
 *              edad: 17
 *              nacionalidad: peruan@
 *      
 */

/**
 * @swagger
 * /api/empleados:
 *  post:
 *      sumary: Guardando nuevos empleados 
 *      tags: [Empleados]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Empleados'
 *      responses:
 *          200:
 *              description: Libro agregado correctamente
 */


//Guardar empleados 
router.post("/empleados", async (req, res) => {   
    const empleado = empleadosModel(req.body);

    empleado.save()
        .then((data) => res.json ({mensaje : "El empleado a sido agregado"}))
        .catch((error) =>  res.json ({mensaje: error})); 
});


/**
 * @swagger
 * /api/empleados:
 *  get:
 *      sumary: Lista de empleados
 *      tags: [Empleados]
 *      responses:
 *          200:
 *              description : Informacion Enlistada
 *              content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                  items:
 *                      $ref: '#components/schemas/Empleados'
 * 
 * 
 */
//Enlistar empleados 
router.get("/empleados", async (req, res) => {
    empleadosModel.find()
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**Enlistar empleados por nombre */

/**
 * @swagger
 * /api/empleados/{nombre}:
 *  get:
 *      sumary: Lista de empleados por nombre
 *      tags: [Empleados]
 *      parameters:
 *          - in: path
 *            name: nombre
 *            schema:
 *              type: string
 *            required: true
 *            description: Empleados a la vista
 *      responses:
 *          200:
 *              description: El empleado ha sido atraido
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Empleados'
 *          404:
 *              description: No existe el empleado buscado
 */


//Enlistar empleados por nombre
router.get("/empleados/:nombre", async (req, res) => {
    const {nombre} = req.params;
    empleadosModel.find({$set: {nombre}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});

/**
 * @swagger
 * /api/empleados/{dni}:
 *  get:
 *      sumary: Lista de empleados por dni
 *      tags: [Empleados]
 *      parameters:
 *          - in: path
 *            name: empleado
 *            schema:
 *              type: string
 *            required: true
 *            description: Escribe mi DNI
 *      responses:
 *          200:
 *              description: El empleado te puede ver
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Libros'
 *          404:
 *              description: No existe el empleado buscado
 */

//Listar empleados por dni
router.get("/empleados/:dni", async (req, res) => {
    const {dni} = req.body;
    empleadosModel.find({$set: {dni}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/empleados/{dni}:
 *  delete:
 *      sumary: Elimina empleados por dni
 *      tags: [Empleados]
 *      parameters:
 *          - in: path
 *            name: DNI
 *            schema:
 *              type: string
 *            required: true
 *            description: El DNI del empleado
 *      responses:
 *          200:
 *              description: El empleado fue eliminado
 *          404:
 *              description: No existe el empleado buscado
 */



//Eliminar empleados por dni
router.delete("/empleados/:dni", async (req, res) => {
    const {dni} = req.params;
    empleadosModel.deleteOne({$set:{dni}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});


/**
 * @swagger
 * /api/empleados/{dni}:
 *  put:
 *      sumary: Actualiza los empleados por DNI
 *      tags: [Empleados]
 *      parameters:
 *          - in: path
 *            name: DNI del empleado
 *            schema:
 *              type: string
 *            required: true
 *            description: DNI del empleado
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Empleados'
 *      responses:
 *          200:
 *              description: Una nueva version del empleado se creo
 *          404:
 *              description: No existe el empleado que quieres actualizar
 */


//Actualizar empleados por DNI
router.put("/empleados/:dni", async (req, res) => {
    const {dni} = req.params;
    const {nombre, apellido, edad, nacionalidad} = req.body;
    productosModel.updateOne({$set: {dni, nombre, apellido, edad, nacionalidad}})
        .then((data) => res.json (data))
        .catch((error) => res.json (error) )
});
module.exports = router;