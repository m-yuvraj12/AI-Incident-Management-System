import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import incidentsRoutes from "./routes/incidentsRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/incidents", incidentsRoutes);

// Server Listening
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
