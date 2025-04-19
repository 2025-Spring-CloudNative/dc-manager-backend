import express from "express"
const router = express.Router()

import * as dataCenterController from "../controllers/dataCenter.controller"


router.get("/",
    /*
        #swagger.tags = ['DataCenter']
        #swagger.summary = 'getDataCenters'
        #swagger.responses[200] = {
            description: 'An array of DataCenter objects',
            schema: [{ $ref: '#/definitions/DataCenter' }]
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
  dataCenterController.getDataCenters)    

router.get("/:id", 
    /*
        #swagger.tags = ['DataCenter']
        #swagger.summary = 'getDataCenterById'
        #swagger.responses[200] = {
            description: 'An array of DataCenter objects',
            schema: [{ $ref: '#/definitions/DataCenter' }]
            }
        #swagger.responses[404] = {
            description: 'Data center not found',
            schema: { message: 'Data center not found' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
  dataCenterController.getDataCenterById);


router.post("/",
    /*  
        #swagger.tags = ['DataCenter']
        #swagger.summary = 'createDataCenter'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Main DC" },
                        location: { type: "string", example: "Taipei" },
                        subnetId: { type: "number", example: "1" }
                    },
                    required: ["name", "location", "subnetId"]
                }
            }
        }
    } 
  */
  dataCenterController.createDataCenter)

// todo 
router.patch("/:id",
    /* 
        #swagger.tags = ['DataCenter']
        #swagger.summary = 'updateDataCenter'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            name: { type: "string", example: "台北資料中心" },
                            location: { type: "string", example: "台北市" },
                            subnetId: { type: "number", example: 1 }
                        },
                        required: ["id", "name", "location", "subnetId"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'update Subnet successfully',
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            location: { type: "string" },
                            subnetId: { type: "number" },
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
    dataCenterController.updateDataCenter);

router.delete("/:id", 
    /*
        #swagger.tags = ['DataCenter']
        #swagger.summary = 'deleteDataCenter'
        #swagger.responses[200] = {
            description: 'Data center deleted successfully',
            schema: { message: 'Data center deleted successfully' }
        }
        #swagger.responses[404] = {
            description: 'Data center not found',
            schema: { message: 'Data center not found' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
  dataCenterController.deleteDataCenter);



  
export default router
