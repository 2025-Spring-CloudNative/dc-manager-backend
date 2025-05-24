import express from "express"
const router = express.Router()

import * as serviceController from "../controllers/service.controller"

router.get("/",
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'getServices'
        #swagger.responses[200] = {
          description: 'An array of Service objects',
          schema: [{ $ref: '#/definitions/Service' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    serviceController.getServices)

router.get("/:id",
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'getServiceById'
        #swagger.responses[200] = {
            description: 'Get service successfully',
            schema: {
                id: "number",
                name: "string",
                poolId: "number"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    serviceController.getServiceById)   
    
router.get("/util/:id",
    /*
        #swagger.tags = ['Service']
        #swagger.summary = 'getServiceRackUtilization'
        #swagger.responses[200] = {
            description: 'Get service rack utilization successfully',
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
    serviceController.getServiceRackUtilization)

router.get("/fault/:id",
    /*
        #swagger.tags = ['Service']
        #swagger.summary = 'getServiceFaultRate'
        #swagger.responses[200] = {
            description: 'Get service fault rate successfully',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            faultRate: {
                                type: 'number',
                                example: 0.05
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
    serviceController.getServiceFaultRate)

router.post("/",
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'createService'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            service: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Web Server" }
                                }
                            },
                            dataCenter: {
                                type: "object",
                                properties: {
                                    "name": { type: "string", example: "Main DC" },
                                    "location": { type: "string", example: "Taipei" },
                                    "subnetId": { type: "string", example: 1 }
                                }
                            },
                            cidrFromUser: { type: "string", example: "192.168.1.0/24" }
                        },
                        required: ["service", "dataCenter", "cidrFromUser"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'create service successfully',
            schema: {
                id: "number"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */  
    serviceController.createService)

router.patch("/:id",  
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'updateService'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Web Server" },
                            poolId: { type: "number", example: 1 }
                        },
                        required: ["name", "poolId"]
                    }
                }
            }
        }
    */  
    serviceController.updateService)

router.delete("/:id",
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'deleteService'
        #swagger.responses[200] = {
            description: 'Delete service successfully',
            schema: { message: "string" }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */  
    serviceController.deleteService)
    
    

export default router