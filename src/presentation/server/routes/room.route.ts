import express from "express"
const router = express.Router()

import * as roomController from "../controllers/room.controller"

router.get(
    "/",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'getRooms'
        #swagger.responses[200] = {
            description: 'An array of Room objects',
            schema: [{ $ref: '#/definitions/Room' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }  
    */
    roomController.getRooms
)

router.get("/:id",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'getRoomById'
        #swagger.responses[200] = {
            description: 'Get room successfully',
            schema: {
                id: "number",
                name: "string",
                unit: "number",
                dataCenterId: "number"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    roomController.getRoomById
)

router.post("/",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'createRoom'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Room A" },
                            unit: { type: "number", example: 3 },
                            dataCenterId: { type: "number", example: 1 }
                        },
                        required: ["name", "unit", "dataCenterId"]
                    }
                }
            }
        }
        #swagger.responses[200] = { description: 'OK' }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }   
    */
    roomController.createRoom
)

router.patch("/:id",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'updateRoom'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Updated Room A" },
                            unit: { type: "number", example: 3 },
                            dataCenterId: { type: "number", example: 1 }
                        },
                        required: ["name", "unit", "dataCenterId"]
                    }
                }
            }
        }
        #swagger.responses[200] = { 
            description: 'OK' 
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    roomController.updateRoom
)

router.delete("/:id",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'deleteRoom'
        #swagger.responses[200] = {
            description: 'OK',
            schema: { message: 'string' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    roomController.deleteRoom
)

export default router
