import express from "express"
const router = express.Router()

import * as machineController from "../controllers/machine.controller"

router.get("/", 
    /*
        #swagger.tags = ['Machine']
        #swagger.summary = 'getMachines'
        #swagger.responses[200] = {
          description: 'An array of Machine objects',
          schema: [{ $ref: '#/definitions/Machine' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */  
    machineController.getMachines)

router.get("/:id",
    /*
        #swagger.tags = ['Machine']
        #swagger.summary = 'getMachineById'
        #swagger.responses[200] = {
            description: 'Get machine successfully',
            schema: {
                id: "number",
                name: "string",
                startUnit: "number",
                unit: "number",
                macAddress: "string",
                rackId: "number",
                status: "string",
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    machineController.getMachineById)

router.post("/", 
    /*
        #swagger.tags = ['Machine']
        #swagger.summary = 'createMachine'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Server-01" },
                            startUnit: { type: "number", example: 1 },
                            unit: { type: "number", example: 1 },
                            macAddress: { type: "string", example: "00:1A:2B:3C:4D:5E" },
                            rackId: { type: "number", example: 1 },
                            status: { type: "string", example: "active" },
                        },
                        required: ["name", "rackId", "ipAddressId"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Create machine successfully',
            schema: {
                id: "number",
                name: "string",
                startUnit: "number",
                unit: "number",
                macAddress: "string",
                rackId: "number",
                status: "string",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    machineController.createMachine)

router.patch("/:id",
    /*
        #swagger.tags = ['Machine']
        #swagger.summary = 'updateMachine'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Server-01" },
                            unit: { type: "number", example: 1 },
                            startUnit: { type: "number", example: 1 },
                            macAddress: { type: "string", example: "00:1A:2B:3C:4D:5E" },
                            rackId: { type: "number", example: 1 },
                            status: { type: "string", example: "active" },
                        },
                        required: ["name", "unit", "startUnit", "macAddress", "rackId", "status"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Update machine successfully',
            schema: {
                id: "number",
                name: "string",
                startUnit: "number",
                unit: "number",
                macAddress: "string",
                rackId: "number",
                status: "string",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    machineController.updateMachine)

router.delete("/:id",
    /*
        #swagger.tags = ['Machine']
        #swagger.summary = 'deleteMachine'
        #swagger.responses[200] = {
            description: 'Delete machine successfully',
            schema: {
                id: "number",
                name: "string",
                rackId: "number",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    machineController.deleteMachine) 
    
export default router