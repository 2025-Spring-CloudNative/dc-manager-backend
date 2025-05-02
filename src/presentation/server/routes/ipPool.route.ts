import express from "express"
const router = express.Router()

import * as ipPoolController from "../controllers/ipPool.controller"

router.get("/",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'getIPPools'
        #swagger.responses[200] = {
          description: 'An array of IPPool objects',
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
                cidr: "string"
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
                            cidr: { type: "string", example: "192.168.1.0/25" },
                            subnetId: { type: "number", example: 1 },
                        },
                        required: ["name", "type", "cidr", "subnetId"]
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
            cidr: "string",
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
                            subnetId: { type: "number", example: 1}
                        },
                        required: ["name", "type", "subnetId"]
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
                cidr: "string",
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

router.patch("/extend/:id",
    /*
        #swagger.tags = ['IP Pool']
        #swagger.summary = 'extendIPPool'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            cidr: { type: "string", example: "192.168.1.0/25" },
                        },
                        required: ["cidr"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'IP Pool extended successfully',
            schema: {
                id: "number",
                name: "string",
                type: "string",
                cidr: "string",
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
    ipPoolController.extendIPPool)
    
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