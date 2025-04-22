import express from "express"
const router = express.Router()

import * as roomController from "../controllers/room.controller"

router.get(
    "/",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'getRooms'
        #swagger.responses[200] = {
          description: 'An array of DataCenter objects',
          schema: [{ $ref: '#/definitions/Room' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }  
    */
    roomController.getRooms
)

router.get(
    "/:id",
    /*
        #swagger.tags = ['Room']
        #swagger.summary = 'getRoomById'
        #swagger.responses[200] = {
            description: '成功取得子網路',
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

router.post(
    "/",
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
                            name: { type: "string", example: "A 區機房" },
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

router.patch(
    "/",
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
                            id: { type: "number", example: 1 },
                            name: { type: "string", example: "A 區機房" },
                            unit: { type: "number", example: 3 },
                            dataCenterId: { type: "number", example: 1 }
                        },
                        required: ["id", "name", "unit", "dataCenterId"]
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
    roomController.updateRoom
)

router.delete(
    "/:id",
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
