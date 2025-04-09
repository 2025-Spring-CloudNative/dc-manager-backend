import express from "express"

const server = express()
server.use(express.json())

const PORT = process.env.PORT || 3000

server.use("/hello", (req, res) => {
    res.status(200).json("Hello from server!")
})

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
