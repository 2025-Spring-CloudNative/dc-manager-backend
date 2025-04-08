import express from "express";
import messageRoute from "./routes/messageRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", messageRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/hello`);
});
