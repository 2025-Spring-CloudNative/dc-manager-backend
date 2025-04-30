import express from "express"
const router = express.Router()

import * as rackController from "../controllers/rack.controller"

router.get("/", 
    /*
        #swagger.tags = ['Rack']
        #swagger.summary = 'getRacks'
        #swagger.responses[200] = {
          description: 'An array of Rack objects',
          schema: [{ $ref: '#/definitions/Rack' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    rackController.getRacks)

router.get("/:id",
    /*
        #swagger.tags = ['Rack']
        #swagger.summary = 'getRackById'
        #swagger.responses[200] = {
            description: 'Get rack successfully',
            schema: {
                id: "number",
                name: "string",
                height: "number",
                tag: "string",
                roomId: "number"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    rackController.getRackById)

router.post("/", 
    /*
        #swagger.tags = ['Rack']
        #swagger.summary = 'createRack'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Rack A" },
                            height: { type: "number", example: 2 },
                            tag: { type: "string", example: "Storage" },
                            roomId: { type: "number", example: 1 }
                        },
                        required: ["name", "height", "tag", "roomId"]
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
    rackController.createRack)

router.patch("/",
    /*
        #swagger.tags = ['Rack']
        #swagger.summary = 'updateRack'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            name: { type: "string", example: "Updated Rack A" },
                            height: { type: "number", example: 42 },
                            tag: { type: "string", example: "Storage" },
                            roomId: { type: "number", example: 1 },
                        },
                        required: ["id", "name", "height", "tag", "roomId"]
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
    rackController.updateRack)

router.delete("/:id",
    /*
        #swagger.tags = ['Rack']
        #swagger.summary = 'deleteRack'
        #swagger.responses[200] = { description: 'OK' }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    rackController.deleteRack)

export default router