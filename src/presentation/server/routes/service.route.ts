import express from "express"
const router = express.Router()

import * as serviceController from "../controllers/service.controller"

router.get("/",
    /*
        #swagger.tags = ['Services']
        #swagger.summary = 'getServices'
        #swagger.responses[200] = {
          description: 'An array of DataCenter objects',
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
            description: '成功取得服務',
            schema: {
                id: "number",
                name: "string",
                machineId: "number"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */
    serviceController.getServiceById)   
    
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
                                    id: { type: "number", example: 1 },
                                    name: { type: "string", example: "Web Server" }
                                }
                            },
                            racks: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "number", example: 1 },
                                        name: { type: "string", example: "Rack-01" },
                                        height: { type: "number", example: 42 },
                                        tag: { type: "string", example: "tag001" },
                                        roomId: { type: "number", example: 1 }
                                    }
                                }
                            },
                            cidrFromUser: { type: "string", example: "192.168.1.0/25" }
                        },
                        required: ["service", "racks", "cidrFromUser"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: '成功創建 Service',
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
                            machineId: { type: "number", example: 1 }
                        },
                        required: ["name", "machineId"]
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
            description: '成功刪除服務',
            schema: { message: "string" }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        } 
    */  
    serviceController.deleteService)
    
    

export default router