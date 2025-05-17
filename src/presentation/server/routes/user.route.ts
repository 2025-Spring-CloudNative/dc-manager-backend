import express from "express"
const router = express.Router()

import * as userController from "../controllers/user.controller"

router.patch(
    "/:id",
    /* 
        #swagger.tags = ['User']
        #swagger.summary = 'updateUser'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "John" },
                            email: { type: "string", example: "test@gmail.com" },
                            role: { type: "string", example: "user"}
                        },
                        required: ["name", "email"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'update user successfully',
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            email: { type: "string" },
                            role: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" }
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
    userController.updateUser
)

router.patch(
    "/reset-password/:id",
    /* 
        #swagger.tags = ['User']
        #swagger.summary = 'updateUserPassword'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            oldPassword: { type: "string", example: "oldpassword" },
                            newPassword: { type: "string", example: "newpassword" }
                        },
                        required: ["oldPassword", "newPassword"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'update user password successfully',
            schema: { message: 'string' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    userController.updateUserPassword
)

export default router
