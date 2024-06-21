import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); //to parrse the incoming requests with JSON payloads from req.body.
app.use(cookieParser());

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
