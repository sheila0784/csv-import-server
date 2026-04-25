import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";
import exportRoutes from "./routes/export.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api/export", exportRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});