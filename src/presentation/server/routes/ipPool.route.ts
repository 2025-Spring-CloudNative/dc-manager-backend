import express from "express"
const router = express.Router()

import * as ipPoolController from "../controllers/ipPool.controller"

router.get("/",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'getIPPools'
        #swagger.responses[200] = {
          description: 'An array of DataCenter objects',
          schema: [{ $ref: '#/definitions/IPPool' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */ 
    ipPoolController.getIPPools)

router.get("/:id",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'getIPPoolById'
        #swagger.responses[200] = {
            description: 'Get IP Pool successfully',
            schema: {
                id: "number",
                name: "string",
                subnetId: "number",
                startIp: "string",
                endIp: "string",
                gateway: "string",
                netmask: "string",
                dns: "string",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipPoolController.getIPPoolById)

router.post("/", 
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'createIPPool'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Main IP Pool" },
                            type: { type: "string", example: "static" },
                            startIp: { type: "string", example: "192.168.0.100" }, 
                            endIp: { type: "string", example: "192.168.0.200" },
                            subnetId: { type: "number", example: 1 },
                        },
                        required: ["name", "type", "startIp", "endIp", "subnetId"]
                    }
                }
            }
        }
    #swagger.responses[200] = {
        description: 'IP Pool created successfully',
        schema: {
            id: "number",
            name: "string",
            type: "string",
            startIp: "string",
            endIp: "string",
            subnetId: "number",
            createdAt: "string",
            updatedAt: "string"
        }
    }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */

    ipPoolController.createIPPool)

router.patch("/:id",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'updateIPPool'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            name: { type: "string", example: "Main IP Pool" },
                            type: { type: "string", example: "dynamic" },
                            startIp: { type: "string", example: "10.0.0.10"},
                            endIP: { type: "string", example: "10.0.0.50"},
                            subnetId: { type: "number", example: 1}
                        },
                        required: ["name", "type", "startIp", "endIp", "subnetId"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'IP Pool updated successfully',
            schema: {
                id: "number",
                name: "string",
                type: "string",
                startIp: "string",
                endIp: "string",
                subnetId: "number",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipPoolController.updateIPPool)
    
router.delete("/:id",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'deleteIPPool'
        #swagger.responses[200] = {
            description: 'IP Pool deleted successfully',
            schema: {
                message: "IP Pool deleted successfully"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    ipPoolController.deleteIPPool)
           

export default router