import express from "express"
const router = express.Router()

import * as AuthController from "../controllers/auth.controller"


router.post("/register",
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'User Registration'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "Alice" },
                            email: { type: "string", example: "user@example.com" },
                            passwordHash: { type: "string", example: "password123" },
                            role: { type: "string", example: "user" }
                            },
                        required: ["email", "passwordHash", "name", "role"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'User registered successfully',
            schema: {
                name: "Young",
                email: "alice@example.com",
                passwordHash: "$2b$10$7YiJtNdp0f4jNb7L2wrBFOJhL6AnQU4zXOf9QdH1ACfXX.c0bmJxO",
                role: "user"
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    AuthController.userRegister)    

router.post("/login",
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'User Login'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: { type: "string", example: "user@example.com" },
                            password: { type: "string", example: "password123" }
                        },
                        required: ["email", "password"]
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'User logged in successfully',
            schema: {
                accessToken: "string",
                refreshToken: "string",
                user: {
                    name: "Alice",
                    email: "user@example.com"
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    AuthController.userLogin)

router.delete("/logout",
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'User Logout'
        #swagger.responses[200] = {
            description: 'User logged out successfully',
            schema: { message: 'Logged out successfully' }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'string' }
        }
    */
    AuthController.userLogout)

router.get("/refresh",
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'Refresh Access Token'
        #swagger.responses[200] = {
            description: 'Access token refreshed successfully',
            schema: {
                accessToken: "string",
                user: {
                    name: "Alice",
                    email: "alice@example.com"
                }
            }
        }
    */
    AuthController.refreshAccessToken)

router.get("/session",
    /*
        #swagger.tags = ['Auth']
        #swagger.summary = 'Get Session'
        #swagger.security = [{ bearerAuth: [] }]
        #swagger.responses[200] = {
            description: 'Session retrieved successfully',
            schema: {
                accessToken: "string",
                user: {
                    name: "Alice",
                    email: "alice@example.com"
                }
            }
        }
    */
    AuthController.getSession)  

export default router
