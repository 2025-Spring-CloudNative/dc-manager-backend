import express from "express"
const router = express.Router()

import * as subnetController from "../controllers/subnet.controller"

router.get("/",
    /*
        #swagger.tags = ['Subnet']
        #swagger.summary = 'getSubnets'
        #swagger.responses[200] = {
          description: 'An array of Subnet objects',
          schema: [{ $ref: '#/definitions/Subnet' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    subnetController.getSubnets)
    
router.get("/:id",
    /*    
        #swagger.tags = ['Subnet']
        #swagger.summary = 'getSubnetById'
        #swagger.responses[200] = {
            description: 'Get subnet successfully',
            schema: {
                id: "number",
                cidr: "string",
                netmask: "string",
                gateway: "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    subnetController.getSubnetById)

router.get("/util/:id", 
    /*
        #swagger.tags = ['Subnet']
        #swagger.summary = 'getSubnetIPUtilization'
        #swagger.responses[200] = {
            description: 'Get Subnet IP utilization successfully',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            utilization: {
                                type: 'number',
                                example: 0.75
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    subnetController.getSubnetIPUtilization)

router.post("/",
    /*
        #swagger.tags = ['Subnet']
        #swagger.summary = 'Create a new subnet'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            cidr: { type: "string", example: "192.168.1.0/24" },
                            netmask: { type: "string", example: "255.255.255.0" },
                            gateway: { type: "string", example: "192.168.1.1" }
                        },
                        required: ["cidr", "netmask", "gateway"]
                    }
                }
            }
        } 
        #swagger.responses[200] = {
            description: 'Subnet created successfully',
            schema: { id: "number" }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    
    subnetController.createSubnet)

router.patch("/:id", 
    /* 
        #swagger.tags = ['Subnet']
        #swagger.summary = 'updateSubnet'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            gateway: { type: "string", example: "192.168.1.1" }
                        },
                        required: ["gateway"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'update Subnet successfully',
            schema: {
                id: "number",
                cidr: "string",
                netmask: "string",
                gateway: "string",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[404] = {
            description: 'Subnet not found',
            schema: { message: 'Subnet not found' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    subnetController.updateSubnet)

router.patch("/extend/:id", 
    /*
        #swagger.tags = ['Subnet']
        #swagger.summary = 'extendSubnet'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            cidr: { type: "string", example: "192.168.1.0/24" },
                            netmask: { type: "string", example: "255.255.255.0" },
                            gateway: { type: "string", example: "192.168.1.1" }
                        },
                        required: ["cidr", "netmask", "gateway"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Subnet extended successfully',
            schema: {
                id: "number",
                cidr: "string",
                netmask: "string",
                gateway: "string",
                createdAt: "string",
                updatedAt: "string"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    subnetController.extendSubnet)

router.delete("/:id",
    /*
        #swagger.tags = ['Subnet']
        #swagger.summary = 'deleteSubnet'
        #swagger.responses[200] = {
            description: 'OK',
            schema: { message: 'string' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    subnetController.deleteSubnet)

export default router