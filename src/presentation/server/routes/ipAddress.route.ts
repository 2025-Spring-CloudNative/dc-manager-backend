import express from "express"
const router = express.Router()

import * as ipAddressController from "../controllers/ipAddress.controller"

router.get("/", 
    /*
        #swagger.tags = ['IP Address']
        #swagger.summary = 'getIPAddresses'
        #swagger.responses[200] = {
          description: 'An array of IPAddress objects',
          schema: [{ $ref: '#/definitions/IPAddress' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */  
    ipAddressController.getIPAddresses)

router.get("/:id",
    /*
        #swagger.tags = ['IP Address']
        #swagger.summary = 'getIPAddressById'
        #swagger.responses[200] = {
            description: 'Get IP Address successfully',
            schema: {
                id: "number",
                address: "string",
                status: "string",
                poolId: "number",
                machineId: "number",
                createdAt: "string",
                updatedAt: "string",
                allocatedAt: "string",
                releasedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipAddressController.getIPAddressById)

router.post("/", 
    /*
        #swagger.tags = ['IP Address']
        #swagger.summary = 'createIPAddress'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            address: { type: "string", example: "192.168.0.10" },
                            status: { type: "string", example: "allocated" },
                            poolId: { type: "number", example: 100 },
                            machineId: { type: "number", example: 200 },
                        },
                        required: ["id", "address", "status", "poolId", "machineId"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Create IP Address successfully',
            schema: {
                id: "number",
                address: "string",
                status: "string",
                poolId: "number",
                machineId: "number",
                createdAt: "string",
                updatedAt: "string",
                allocatedAt: "string",
                releasedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */                      
    ipAddressController.createIPAddress)

router.patch("/:id",
    /*
        #swagger.tags = ['IP Address']
        #swagger.summary = 'updateIPAddress'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            address: { type: "string", example: "192.168.0.11" },
                            status: { type: "string", example: "allocated" },
                            poolId: { type: "number", example: 101 },
                            machineId: { type: "number", example: 201 },
                        },
                        required: ["id", "address", "status", "poolId", "machineId"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Update IP Address successfully',
            schema: {
                id: "number",
                address: "string",
                status: "string",
                poolId: "number",
                machineId: "number",
                createdAt: "string",
                updatedAt: "string",
                allocatedAt: "string",
                releasedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipAddressController.updateIPAddress)

router.delete("/:id",
    /*
        #swagger.tags = ['IP Address']
        #swagger.summary = 'deleteIPAddress'
        #swagger.responses[200] = {
            description: 'Delete IP address successfully',
            schema: {
                message: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipAddressController.deleteIPAddress)


export default router;